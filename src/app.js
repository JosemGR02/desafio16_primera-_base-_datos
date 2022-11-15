
// imports
import express from "express";
import { Server as ServidorHttp } from "http";
import { Server as ServidorIO } from "socket.io";
import { daoMensajes, daoProductos } from "./Dao/index.js";
import handlebars from "express-handlebars";
import { rutas } from "./Rutas/index.js";



// daysjs
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat)


const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))



// IO
const servidorHttp = new ServidorHttp(app);
const io = new ServidorIO(servidorHttp);


//Motor de plantilla
app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" }));

app.set("view engine", "hbs");
app.set("views", "./views");


//Ruta
app.use('/api', rutas)


//Servidor
servidorHttp.listen(PORT, () => { console.log(`Servidor escuchando en puerto: ${PORT}`) })



// EVENTOS

// conexion usuarios

io.on('connection', socket => {
    console.log(`usuario conectado ${socket.id}`);
    enviarTodosProds()
    enviarTodosMsjs()

    socket.on('nuevo producto', nuevoProd => {
        nuevoProducto(socket, io, nuevoProd)
    })

    socket.on('nuevo mensaje', nuevoMsg => {
        nuevoMensaje(socket, io, nuevoMsg)
    })
})


// enviar todos
const enviarTodosProds = async (socket) => {
    const todosProds = await daoProductos.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}

const enviarTodosMsjs = async (socket) => {
    const todosMsjs = await daoMensajes.obtenerTodos()
    io.sockets.emit('todos los mensajes', todosMsjs)
}



// nuevo mensaje

const nuevoMensaje = async (socket, io, nuevoMsj) => {
    const fecha = new Date()
    const fechaFormateada = dayjs(fecha).format('DD/MM/YYYY hh:mm:ss')
    console.log("fecha formateada", fechaFormateada)
    await daoMensajes.guardar({ msj: nuevoMsj, createDate: `${fechaFormateada} hs` })

    const todosMsjs = await daoMensajes.obtenerTodos()
    io.sockets.emit('todos los mensajes', todosMsjs)
}


// nuevo producto

const nuevoProducto = async (socket, io, nuevoProd) => {
    await daoProductos.guardar(nuevoProd)
    const todosProds = await daoProductos.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}



//tabla productos

// CREATE TABLE `primerabasedatos`.`productos` (`id` INT NOT NULL AUTO_INCREMENT , `titulo` VARCHAR(20) NOT NULL , `precio` INT NOT NULL , `imagen` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

//tabla mensajes

//CREATE TABLE `primerabasedatos`.`mensajes` (`id` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(128) NOT NULL , `texto` TEXT NOT NULL , `marca de tiempo` DATE NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;