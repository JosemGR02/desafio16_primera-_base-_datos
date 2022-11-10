
import { rutas } from 'express';
import { rutaProductos } from './productos/producto.js';
//const rutas = require('express').Router()


rutas.use('/productos', rutaProductos)


export { rutas }
