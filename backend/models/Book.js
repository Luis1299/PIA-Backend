const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    name: { type: String, required: true},
    author: { type: String, required: true},
    price: { type: Number, required: true},
    imageUri: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

BookSchema.methods.isValid = function(body){
    let response = {
        isValid: true,
        nombre: '',
        autor: '',
        precio: '',
        imageUri: '',
        msg: ''
    }
    if(!body.name || !body.author || !body.price || !body.imageUri){
        response.msg = "Debe llenar todos los campos"
        response.isValid = false
    }
    else{
        if(body.name.length < 6){
            response.nombre = "El nombre es muy corto"
            response.isValid = false
        }
        if(body.author.length < 6){
            response.autor = "El autor es muy corto"
            response.isValid = false
        }
        if( isNaN(body.price) && isNaN(parseFloat(body.price)) ){
            response.precio = "El precio debe ser un numero"
            response.isValid = false
        }
        else if( body.price < 0 ){
            response.precio = "El precio debe ser mayor a 0"
            response.isValid = false
        }
        if(body.imageUri.length < 10){
            response.autor = "El url es muy corto"
            response.isValid = false
        }
    } 
    return response
}

const Book = mongoose.model('Book', BookSchema)

module.exports = Book