const jwt = require('jsonwebtoken') //jwt
const UserController = require('./Controllers/UserController')

const time = '6h'
const SecretKey = process.env.SECRET_KEY || "SUPERSEKRETO"

async function validateToken(token){
    try{
        token = token.replace('Bearer ', '')
        const decoded = await jwt.verify(token, SecretKey) // Decodifica el token
        const user = await new UserController().getById(decoded.id) // verifica la existencia del usuario
        if(user)
            return Promise.resolve(user)
        return Promise.reject("Ese usuario ya no existe, el token es invalido")
    }catch(err){
        return Promise.reject(err)
    }   
}

async function generateToken(id){
    return await jwt.sign({
        id: id
    }, SecretKey, {expiresIn: time})
}

module.exports = {
    validateToken,
    generateToken
}