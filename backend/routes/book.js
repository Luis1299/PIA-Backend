const Book = require('../models/Book')

const router = require('express').Router()

// GET
router.get('/', async (req, res) => {
    res.send("Libros")
})

// POST
router.post('/upload', async (req,res) => {
    res.send("Nuevo libro")
})

// UPDATE
router.put('/update/:id', async (req,res) => {
    res.send("Actualizar libro con id")
})

// DELETE
router.delete('/:id', async (req, res) => {
    res.send("Borrar libro con id")
})

module.exports = router