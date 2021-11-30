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

// Nosotros

app.get('/nosotros', async (req, res) =>{
    res.render('todos_nosotros')
})

// Reglas

app.get('/reglas', async (req, res) =>{
    res.render('todos_reglas')
})

// Términos

app.get('/terminos', async (req, res) =>{
    res.render('todos_terminos')
})


// Login

app.get('/login', async (req, res) =>{
    res.render('todos_login')
})

// Login

app.get('/registro', async (req, res) =>{
    res.render('usuario_registro')
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
    
    res.redirect('/admin/categoria')
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

    res.redirect('/admin/categoria')
})

// Eliminar 

app.get('/admin/eliminarcategoria/:codigo', async (req, res) =>{
    const idCategoria = req.params.codigo
    await db.Categoriajuego.destroy({
        where: {
            id : idCategoria
        }
    })
    res.redirect('/admin/categoria')
})

// Admin mostrar juegos

app.get('/admin/juego', async (req, res)=>{
    const categorias = await db.Categoriajuego.findAll()
    const juegos = await db.Juego.findAll()

    // Agregamos el nombre de la categoria a lista
    let nuevaListaJuegos = []
    for (let juego of juegos){
        const categoriaJuego = await juego.getCategoriajuego()
        nuevaListaJuegos.push({
            id : juego.id,
            nombre : juego.nombre,
            categoriaJuegoNombre : categoriaJuego.nombre
        })
    }

    res.render('admin_juego', {
        categorias : categorias,
        juegos : nuevaListaJuegos
    })
})

// Nuevo juego

app.get('/admin/juego_new', async (req, res) =>{
    //Cargamos la categorias
    const categoriaJuego = await db.Categoriajuego.findAll()
    res.render('juego_new', {
        //Con este nombre lo llamamos en el template
        categoriaJuego : categoriaJuego
    })
})

app.post('/admin/juego_new', async (req, res) =>{
    const juegoNombre = req.body.juego_nombre
    const juegoCategoria = req.body.juego_categoria_id

    await db.Juego.create({
        nombre : juegoNombre,
        categoriajuegoid : juegoCategoria
    })

    res.redirect('/admin/juego')
})

// Eliminar 

app.get('/admin/eliminarjuego/:codigo', async (req, res) =>{
    const idJuego = req.params.codigo
    await db.Juego.destroy({
        where: {
            id : idJuego
        }
    })
    res.redirect('/admin/juego')
})

// Admin mostrar partidas

app.get('/admin/partida', async (req, res) =>{

    const juegos = await db.Juego.findAll()
    const partidas = await db.Partida.findAll()

     // Agregamos el nombre del juegon a lista
     let nuevaListaPartidas = []
    for(let partida of partidas){
        const Juego = await partida.getJuego()
        nuevaListaPartidas.push({
            id : partida.id,
            tipoJuegoNombre : Juego.nombre,
            fecha : partida.fecha,
            inicio : partida.inicio,
            duracion : partida.duracion,
            estado : partida.estado
        })
    }

    res.render('admin_partida', {
        juegos : juegos,
        partidas : nuevaListaPartidas
    })
})

// Nueva partida

app.get('/admin/partida_new', async (req, res) =>{

    const tipoJuego = await db.Juego.findAll()

    res.render('partida_new', {
        tipoJuego : tipoJuego
    })
})

app.post('/admin/partida_new', async (req, res) =>{
    const partidaNombre = req.body.partida_tipo_id
    const partidaFecha = req.body.partida_fecha
    const partidaHora = req.body.partida_hora
    const partidaDuracion = req.body.partida_duracion
    const partidaEstado = req.body.partida_estado

    await db.Partida.create({
        tipoJuegoId : partidaNombre,
        fecha : partidaFecha,
        inicio : partidaHora,
        duracion : partidaDuracion,
        estado : partidaEstado
    })

    res.redirect('/admin/partida')
})

// Modificar partida y agregar equipos

app.get('/admin/modificarpartida/:codigo', async (req, res)=>{
    const idPartida = req.params.codigo

    const partida = await db.Partida.findOne({
        where : {
            id : idPartida
        }
    })

    const tipoJuego = await db.Juego.findAll()

    const equiposRegistrados = await db.Equipo.findAll()

    const partidaEquipos = await db.PartidaEquipo.findAll({
        where : {
            partidaId : idPartida
        }
    })
    const arrEquiposEnPartida = []

    if(partidaEquipos.length > 0){
        for (let te of partidaEquipos){
            const equipo = await  te.getEquipo()
            arrEquiposEnPartida.push(equipo)
        }
    }
    
    res.render('partida_update', {
        partida : partida,
        tipoJuego : tipoJuego,
        equipos: equiposRegistrados,
        equiposEnPartida : arrEquiposEnPartida

    })
})

app.post('/admin/modificarpartida', async (req, res) => {
    const idPartida = req.body.partida_id
    const tipoPartida = req.body.partida_tipo_id
    const fechaPartida = req.body.partida_fecha
    const inicioPartida = req.body.partida_hora
    const duracionPartida = req.body.partida_duracion

    // Obtenemos partida

    const partida = await db.Partida.findOne({
        where : {
            id : idPartida
        }
    })

    // Cambiar propiedades
    partida.tipoJuegoId = tipoPartida
    partida.fecha = fechaPartida
    partida.inicio = inicioPartida
    partida.duracion = duracionPartida

    // Guardamos la info

    await partida.save()

    res.redirect('/admin/partida')
})

// Eliminar partida

app.get('/admin/eliminarpartida/:codigo', async (req, res) =>{
    const idPartida = req.params.codigo
    await db.Partida.destroy({
        where: {
            id : idPartida
        }
    })
    res.redirect('/admin/partida')
})

// Mostrar banners 

app.get('/admin/banner', async (req, res) =>{

    const banners = await db.Banner.findAll()

    res.render('admin_banner', {
        banners : banners
    })
})

//Agregar banner

app.get('/admin/banner_new', (req, res)=>{
    res.render('banner_new')
})

app.post('/admin/banner_new', upload.single('banner_image'), async (req, res)=>{
    const imgNombre = req.body.banner_nombre
    const imgurlCloud = req.body.banner_urlCloud
    const imgUrl = req.body.banner_url
    const imgEstado = req.body.banner_estado

    console.log(req.file)

    await db.Banner.create({
        imageName : imgNombre,
        urlCloud : imgurlCloud,
        url : imgUrl,
        estado : imgEstado
    })

    res.redirect('/admin/banner')
})

//Eliminar Imagen de la Base de Datos Banner

app.get('/admin/eliminarbanner/:codigo', async (req, res) =>{
    const idBanner = req.params.codigo
    await db.Banner.destroy({
        where: {
            id : idBanner
        }
    })
    res.redirect('/admin/banner')
})

// Se muestra la lista de usuarios (view admin)

app.get('/admin/usuario', async (req, res) =>{

    const usuarios = await db.Usuario.findAll()

    res.render('admin_usuario', {
        usuarios : usuarios
    })
})

// Modificar usuario

app.get('/admin/modificarusuario/:codigo', async (req, res) =>{
    const idUsuario = req.params.codigo

    const usuario = await db.Usuario.findOne({
        where : {
            id : idUsuario
        }
    })
    res.render('usuario_update', {
        usuario : usuario
    })
})

app.post('/admin/modificarusuario', async (req, res) =>{
    const idUsuario = req.body.usuario_id
    const usuarioValidacion = req.body.usuario_estado

    // 1. Obtener la categoria
    const usuario = await db.Usuario.findOne({
        where : {
            id : idUsuario
        }
    })

    // 2. Cambiar propiedades

    usuario.estado = usuarioValidacion

    // 3. Guardar

    await usuario.save()

    res.redirect('/admin')
})

// Admin view

app.get('/admin', (req, res) =>{
    res.render('admin_pov')
})

//test banner

app.get('/banner', async (req,res) =>{
    const banners = await db.Banner.findAll()

    res.render('banner_test',{
        banners : banners
    })
})


// Listen

app.listen(PORT, ()=> {
    console.log(`El servidor se inicio correctamente en el puerto ${PORT}`)
})

