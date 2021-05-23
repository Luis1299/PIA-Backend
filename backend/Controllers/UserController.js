const User = require("../models/User")
const crypto = require('crypto') // hashing
const SecretKey = process.env.SECRET_KEY || "SUPERSEKRETO"

class UserController{
    constructor(){}

    async getAll(){
        return await User.find({}).select('-timestamp -__v -password')
    }

    async existsEmail(email){
        return await User.exists({email: email})
    }

    async getById(id){
        return await User.findOne({_id: id})
    }

    async login(email, password){
        return await User.findOne({
            email: email, 
            password: crypto.createHash("sha256").update(password).digest("hex")
        })
    }

    async register(body){
        // se crea el objeto user
        const user = new User({firstName: body.firstName, lastName: body.lastName, email: body.email, password: body.password, country: body.country})
        // hashing del password
        user.password = await crypto.createHash("sha256").update(password).digest("hex")
        //se guarda el usuario en la base de datos
        await user.save()
        return user
    }

    async edit(user, firstName, lastName, country){
        if(firstName)
            user.firstName = firstName
        if(lastName)
            user.lastName = lastName
        if(country)
            user.country = country
        await user.save()
    }

    async delete(id){
        // verificar existencia del usuario
        const user = await this.getById(id)
        if(user){
        // borrar el usuario
            await user.delete()
            return Promise.resolve()
        }
        Promise.reject("No se pudo eliminar")
    }

    async isValid(body){
        let response = {
            isValid: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            country: '',
            msg: ''
        }    
        if(!body.firstName || !body.lastName || !body.email || !body.password  || !body.country){
            response.msg = "Los campos no estan completos!"
            response.isValid = false
        }
        else{
            const exists = await this.existsEmail(body.email)
            if(exists == true){
                response.email = "Email ya en uso"
                response.isValid = false
            }        
            if(body.firstName.length < 3){
                response.firstName = "El nombre es demasiado corto"
                response.isValid = false
            }
            if(body.lastName.length < 3){
                response.lastName = "El apellido es demasiado corto"
                response.isValid = false
            }
            // Uso de regexp
            if(!body.email.match(/\S+@\S+\.\S+/)){
                response.email = "El email no es valido"
                response.isValid = false
            }
            if(body.password.length < 6){
                response.password = "La contraseña es muy corta"
                response.isValid = false
            }
            if(body.country.length < 3){
                response.country = "El pais es muy corto"
                response.isValid = false
            }
    
        }
        return response
    }

}

module.exports = UserController