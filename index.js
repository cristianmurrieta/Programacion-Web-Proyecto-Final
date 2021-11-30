// Definimos constantes usadas

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./dao/models')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const upload = multer({dest: 'public/images'})
const e = require('express')
const { Console } = require('console')

const PORT = process.env.PORT || 5000
const app = express()

// Definimos demas datos 

app.use(express.json())
app.use(express.urlencoded({
    extended : false
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(session({
    secret : "trabajo",
    resave : false,
    saveUninitialized : false
}))

app.use(express.static('assets'))
app.set('view engine', 'ejs')


// Index usuario 

app.get('/', async (req, res) =>{
    res.render('index')
})

// Admin mostrar categorias

app.get('/admin/categoria', async (req, res) =>{
    const categorias = await db.Categoriajuego.findAll()

    res.render('admin_categoria', {
        categorias : categorias,
    })
})

// Nueva Categoria
// Mostrarmos view de nueva categoria 

app.get('/admin/categoria_new', (req, res) =>{
    res.render('categoria_new')
})

// Realizamos post de nueva categoria

app.post('/admin/categoria_new', async (req, res)=>{
    const categoriaNombre = req.body.categoria_nombre

    await db.Categoriajuego.create({
        nombre : categoriaNombre
    })
    
    res.redirect('/admin')
})

// Modificar categoria

app.get('/admin/modificarcategoria/:codigo', async (req, res) =>{
    const idCategoria = req.params.codigo

    const categoria = await db.Categoriajuego.findOne({
        where : {
            id : idCategoria
        }
    })
    res.render('categoria_update', {
        categoria : categoria
    })
})

app.post('/admin/modificarcategoria', async (req, res) =>{
    const idCategoria = req.body.categoria_id
    const categoriaNombre = req.body.categoria_nombre

    // 1. Obtener la categoria
    const categoria = await db.Categoriajuego.findOne({
        where : {
            id : idCategoria
        }
    })

    // 2. Cambiar propiedades

    categoria.nombre = categoriaNombre

    // 3. Guardar

    await categoria.save()

    res.redirect('/admin')
})

// Eliminar 

app.get('/admin/eliminarcategoria/:codigo', async (req, res) =>{
    const idCategoria = req.params.codigo
    await db.Categoriajuego.destroy({
        where: {
            id : idCategoria
        }
    })
    res.redirect('/admin')
})

// Listen

app.listen(PORT, ()=> {
    console.log(`El servidor se inicio correctamente en el puerto ${PORT}`)
})
