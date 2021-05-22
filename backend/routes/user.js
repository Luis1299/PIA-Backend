const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken') //jwt
const crypto = require('crypto') // hashing

const SecretKey = process.env.SECRET_KEY || "SUPERSEKRETO"

//GET
router.get('/', async (req, res) => {
    // Verificando el token jwt
    let token = req.headers.authorization
    if(!token){
        return res.status(401).send("Error, inicia sesion primero")
    }
    token = token.replace('Bearer ', '')
    try{
        const valido = await jwt.verify(token, SecretKey) // Valida el token
        if(valido){
            const users = await User.find({}).select('-timestamp -__v -password') // obtiene los usuarios
            res.status(200).json(users) //retorna el resultado
        }
    }catch(err){
        if(err instanceof jwt.TokenExpiredError){
            res.status(401).send("El token ha expirado, inicia sesion nuevamente")
        }
        res.status(401).send("Error, inicia sesion primero")
    }
})

// POST LOGIN
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({
        email: email, 
        password: crypto.createHash("sha256").update(password).digest("hex")
    })
    if(!user){
        return res.status(400).json({
            msg: "Email o contraseña no valido"
        })
    }
    // generar jwt
    const token = await jwt.sign({
        id: user._id
    }, SecretKey, {expiresIn: '6h'})
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
    if(!body.isAdmin){
        body.isAdmin = false
    }
    // se crea el usuario
    const user = new User({firstName, lastName, email, password, country})
    const response = await user.isValid(body) // valida datos
    if(!response.isValid){
        res.status(400).json(response) // Los datos no son validos
    }
    else{
        // hashing del password
        user.password = await crypto.createHash("sha256").update(body.password).digest("hex")
        //se guarda el usuario en la base de datos
        await user.save()

        const token = await jwt.sign({
            id: user._id
        }, SecretKey, {expiresIn: '6h'})
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

    // Verificar token
    const id = req.params.id
    let token = req.headers.authorization
    if(!token){
        res.status(401).send("Error, inicia sesion primero")
    }
    token = token.replace('Bearer ', '')

    try{
        // Verificar token
        const valido = await jwt.verify(token, SecretKey)
        if(valido){
            // verificar existencia del usuario
            const user = await User.findOne({_id: id})
            if(user){
                if(firstName)
                    user.firstName = firstName
                if(lastName)
                    user.lastName = lastName
                if(country)
                    user.country = country
                // se guarda en la base de datos el usuario actualizado
                await user.save()
                // retorna los usuarios
                return res.status(200).json(await User.find({}))
            }else{
                res.status(404).send("Error, ese usuario no existe")
            }
        }
    }catch(err){
        if(err instanceof jwt.TokenExpiredError){
            res.status(401).send("El token ha expirado, inicia sesion nuevamente")
        }
        res.status(401).send("Error, inicia sesion primero")
    }
})

//DELETE
router.delete('/:id', async(req, res) => {
    const id = req.params.id
    
    // Validando el envio del token
    let token = req.headers.authorization
    if(!token){
        res.status(401).send("Error, inicia sesion primero")
    }
    token = token.replace('Bearer ', '')

    try{
        // Verificar token
        const valido = await jwt.verify(token, SecretKey)
        if(valido){
            // verificar existencia del usuario
            const user = await User.findOne({_id: id})
            if(user){
                // borrar el usuario
                await user.delete()
                // obtener usuarios y enviar
                const users = await User.find({}).select('-timestamp -__v -password')
                return res.status(200).json(users)
            }else{
                res.status(403).send("Error, ese usuario no existe")
            }
        }
    }catch(err){
        if(err instanceof jwt.TokenExpiredError){
            res.status(401).send("El token ha expirado, inicia sesion nuevamente")
        }
        res.status(401).send("Error, inicia sesion primero")
    }
})

module.exports = router
