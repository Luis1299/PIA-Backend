const express = require('express')
const jwt = require('jsonwebtoken')

require('dotenv').config() // leer el archivo .env
require('./database') // conectando a la db

const app = express()
const PORT = process.env.PORT || 8000

// Configurar body del request
app.use(express.urlencoded({extended: true}))
app.use(express.json()) // para que aparezca como json

// Configurando rutas
const userRoutes = require('./routes/user')
app.use('/users', userRoutes)
const bookRoutes = require('./routes/book')
app.use('/books', bookRoutes)

// Iniciando servidor
app.listen(PORT, _ => {
    console.log("Servidor iniciado en el puerto: " + PORT)
})

app.get('/', (req, res)=>{
    res.redirect('/books')
})

app.get('*', (req, res) => {
    res.status(404).send('K? 404 esta pagina no existe :(\n prueba con /books o /users')
})