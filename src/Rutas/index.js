
import { Router } from 'express';
import { rutaProductos } from './productos/producto.js';


const rutas = Router()


rutas.use('/productos', rutaProductos)


export { rutas, rutaProductos }
