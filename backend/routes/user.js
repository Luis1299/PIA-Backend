const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken') //jwt
const crypto = require('crypto') // hashing

//GET
router.get('/', async (req, res) => {
    let token = req.headers.authorization
    if(!token){
        return res.status(401).send("Error, inicia sesion primero")
    }
    token = token.replace('Bearer ', '')
    try{
        const valido = await jwt.verify(token, process.env.SECRET_KEY)
        if(valido){
            const users = await User.find({}).select('-timestamp -__v -password')
            res.status(200).json(users)
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
        return res.status(404).json({
            msg: "Error, vuelve a intentarlo"
        })
    }
    // generar jwt
    const token = await jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY, {expiresIn: '2h'})
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
    const user = new User({firstName, lastName, email, password, country})
    const response = await user.isValid(body)
    if(!response.isValid){
        res.status(400).json(response)
    }
    else{
        user.password = await crypto.createHash("sha256").update(body.password).digest("hex")
        await user.save()
        const token = await jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY, {expiresIn: '2h'})
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
        
    // Verificar token
    const id = req.params.id
    let token = req.headers.authorization
    if(!token){
        res.status(401).send("Error, inicia sesion primero")
    }
    token = token.replace('Bearer ', '')
    const {firstName, lastName, country} = req.body
    if(!firstName && !lastName && !country){
        return res.status(400).send("No se ha enviado informacion a traves del cuerpo del request")
    }
    try{
        // Verificar token
        const valido = await jwt.verify(token, process.env.SECRET_KEY)
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
                await user.save()
                // return res.status(200).send("Actualizado con exito")
                return res.status(200).json(await User.find({}))
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

//DELETE
router.delete('/:id', async(req, res) => {
    const id = req.params.id
    let token = req.headers.authorization
    if(!token){
        res.status(401).send("Error, inicia sesion primero")
    }
    token = token.replace('Bearer ', '')
    try{
        // Verificar token
        const valido = await jwt.verify(token, process.env.SECRET_KEY)
        if(valido){
            // verificar existencia del usuario
            const user = await User.findOne({_id: id})
            if(user){
                await user.delete()
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