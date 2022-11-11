
import express from 'express';
import { daoProductos } from '../../Dao/index.js';

const rutaProductos = express.Router()

const obtenerTodosProds = async (solicitud, respuesta, next) => {
    const productos = await daoProductos.obtenerTodos()
    respuesta.json({ datos: productos })
}

const obtenerProdXid = async (solicitud, respuesta, next) => {
    const { id } = solicitud.params
    const producto = await daoProductos.obtenerXid(Number(id))
    respuesta.json({ datos: producto })
}

const crearNuevoProd = async (solicitud, respuesta, next) => {
    const { titulo, precio, imagen } = solicitud.body
    daoProductos.guardar({ titulo, precio, imagen })
    respuesta.json({ datos: { titulo, precio, imagen } })
}

const actualizarProdXid = async (solicitud, respuesta, next) => {
    const { id } = solicitud.params
    const { titulo, precio, imagen } = solicitud.body
    daoProductos.actualizar({ titulo, precio, imagen }, Number(id))
    respuesta.json({ datos: { titulo, precio, imagen } })
}

const eliminarProdXid = async (solicitud, respuesta, next) => {
    const { id } = solicitud.params
    daoProductos.borrarXid(Number(id))
    respuesta.json({ eliminado: true })
}


rutaProductos.get('/', obtenerTodosProds)

rutaProductos.get('/:id', obtenerProdXid)

rutaProductos.post('/', crearNuevoProd)

rutaProductos.put('/:id', actualizarProdXid)

rutaProductos.delete('/:id', eliminarProdXid)



export { rutaProductos }








