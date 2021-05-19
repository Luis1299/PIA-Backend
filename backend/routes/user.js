const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken') //jwt
const crypto = require('crypto') // hashing

//GET
router.get('/', async (req, res) => {
    let token = req.headers.authorization
    if(!token){
        res.status(401).send("Error, inicia sesion primero")
    }
    token = token.replace('Bearer ', '')
    try{
        const valido = await jwt.verify(token, process.env.SECRET_KEY)
        if(valido){
            const libros = await User.find({}).select('-_id -isAdmin -timestamp -__v -password')
            res.status(200).json(libros)
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
    const user = await User.findOne({email: email})
    if(!user){
        return res.status(404).json({
            msg: "El usuario con ese email no existe"
        })
    }
    // generar jwt
    const token = await jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY, {expiresIn: '1h'})
    // enviar token
    res.status(200).json({
        token: token
    }) 
})

//POST
router.post('/register', async (req, res) => {
    const body = {firstName, lastName, email, password} = req.body
    if(!body.isAdmin){
        body.isAdmin = false
    }
    const user = new User({firstName, lastName, email, password})
    const response = await user.isValid(body)
    if(!response.isValid){
        res.status(400).send(response)
    }
    else{
        user.password = await crypto.createHash("sha256").update(body.password).digest("hex")
        await user.save()
        res.status(200).send(user)
    }
})

//PUT
router.put('/:id', async(req, res) => {
        
    // Verificar token
    let token = req.headers.authorization
    if(!token)
        return res.status(401).send("Error, inicia sesion primero")
    token = token.replace('Bearer ', '')
    const {firstName, lastName, email, password} = req.body
    if(!firstName && !lastName && !email && !password){
        return res.status(401).send("No se ha enviado informacion a traves del cuerpo del request")
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
                if(email)
                    user.email = email
                if(password)
                    user.password = await crypto.createHash("sha256").update(password).digest("hex")
                await user.save()
                res.status(200).send("Usuario actualizado exitosamente")
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
                res.status(200).send("Usuario eliminado exitosamente")
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