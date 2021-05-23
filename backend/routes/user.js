const router = require('express').Router()
const UserController = require('../Controllers/UserController')
const { validateToken, generateToken } = require('../token')
const jwt = require('jsonwebtoken')

//GET
router.get('/', async (req, res) => {
    // Verificando el token jwt
    let token = req.headers.authorization
    if(!token)
        return res.status(401).send("Error, inicia sesion primero")
    try{
        // Valida el token
        const valido = await validateToken(token)
        if(valido){
            // obtiene los usuarios
            const users = await new UserController().getAll()
            res.status(200).json(users) //retorna el resultado
        }
        else{
            throw ""
        }
    }catch(err){
        if(err instanceof jwt.TokenExpiredError)
            return res.status(401).send("El token ha expirado, inicia sesion nuevamente")
        res.status(401).send("Error, inicia sesion primero")
    }
})

// POST LOGIN
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await new UserController().login(email, password)
    if(!user){
        return res.status(400).json({
            msg: "Email o contraseña no valido"
        })
    }
    // generar jwt
    const token = await generateToken(user._id)
    // enviar usuario y token
    return res.status(200).json({
        token: token,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        country: user.country,
        uid: user._id
    })
})

//POST REGISTRO
router.post('/register', async (req, res) => {
    const body = {firstName, lastName, email, password, country} = req.body
    // valida datos
    const response = await new UserController().isValid(body) 
    if(!response.isValid){
        res.status(400).json(response) // Los datos no son validos
    }
    else{
        // se crea el usuario
        const user = await new UserController().register(body)
        const token = await generateToken(user._id)
        // se retorna el usuario y token
        res.status(200).json({
            token: token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            country: user.country,
            uid: user._id
        })
    }
})

//PUT
router.put('/:id', async(req, res) => {
        
    const {firstName, lastName, country} = req.body
    if(!firstName && !lastName && !country){
        return res.status(400).send("No se ha enviado informacion a traves del cuerpo del request")
    }
    const id = req.params.id
    // Verificando el token jwt
    const token = req.headers.authorization
    if(!token)
        return res.status(401).send("Error, inicia sesion primero")
    try{
        // Valida el token
        const valido = await validateToken(token)
        if(valido){
            // verificar existencia del usuario
            const userCtrl = new UserController()
            const user = await userCtrl.getById(id)
            if(user){
                await userCtrl.edit(user, firstName, lastName, country)
                // retorna los usuarios
                return res.status(200).json(await userCtrl.getAll())
            }else{
                res.status(404).send("Error, ese usuario no existe")
            }
        }else{
            throw ""
        }
    }catch(err){
        if(err instanceof jwt.TokenExpiredError){
            return res.status(401).send("El token ha expirado, inicia sesion nuevamente")
        }
        res.status(401).send("Error, inicia sesion primero")
    }
})

//DELETE
router.delete('/:id', async(req, res) => {
    const id = req.params.id

    // Verificando el token jwt
    let token = req.headers.authorization
    if(!token)
        return res.status(401).send("Error, inicia sesion primero")
    try{
        // Valida el token
        const valido = await validateToken(token)
        if(valido){
            const userCtrl = new UserController()
            const user = await userCtrl.getById(id)
            if(user){
                await userCtrl.delete(id)
                return res.status(200).json(await userCtrl.getAll())
            }else{
                return res.status(401).send("Ese usuario no existe")
            }
        }
        throw ""
    }catch(err){
        if(err instanceof jwt.TokenExpiredError){
            res.status(401).send("El token ha expirado, inicia sesion nuevamente")
        }
        res.status(401).send("Error, inicia sesion primero")
    }
})

module.exports = router
