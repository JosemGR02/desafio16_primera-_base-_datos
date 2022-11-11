
import express from 'express';
import { rutaProductos } from './productos/producto.js';

const rutas = express.Router()



rutas.use('/productos', rutaProductos)


export { rutas }
