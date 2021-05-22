const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

require('dotenv').config() // leer el archivo .env
require('./database') // conectando a la db

const app = express()
const PORT = process.env.PORT || 8000

// Configurar body del request
app.use(express.urlencoded({extended: true}))
app.use(express.json()) // para que aparezca como json

// Configurar CORS 
app.use(cors())

// Configurando rutas
const userRoutes = require('./routes/user')
app.use('/users', userRoutes)

// Iniciando servidor
app.listen(PORT, _ => {
    console.log("Servidor iniciado en el puerto: " + PORT)
})

//404
app.get('*', (req, res) => {
    res.status(404).send('<div><h1>404 Pagina no encontrada</h1><br/>Easter egg<br/><img width="600" height="400" src="http://images2.memedroid.com/images/UPLOADED54/524dde0e6668e.jpeg"/></div>')
})