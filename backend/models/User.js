const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false},
    timestamp: { type: Date, default: Date.now }
})

UserSchema.methods.isValid = async function(body){
    let response = {
        isValid: true,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isAdmin: '',
        msg: ''
    }    
    if(!body.firstName || !body.lastName || !body.email || !body.password){
        response.msg = "Los campos no estan completos!"
        response.isValid = false
    }
    else{
        const user = await User.findOne({email: email})
        if(user){
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
        if(!body.password.match(/^[A-Za-z]\w{7,14}$/)){
            response.password = "La contraseña es invalida"
            response.isValid = false
        }
    }
    return response
}

const User = mongoose.model('User', UserSchema)

module.exports = User