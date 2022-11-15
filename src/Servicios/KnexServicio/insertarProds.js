
import { baseDeDatoSql } from './conexion/index.js';

// INSERTAR PRODUCTOS

const productos = [
	{ titulo: 'producto 1', descripcion: algo, precio: 3642, codigo:'2133' , stock:30 },
	{ titulo: 'producto 2', descripcion: algo, precio: 5827, codigo:'3411' , stock:23 },
	{ titulo: 'producto 3', descripcion: algo, precio: 9650, codigo:'3314' , stock:16 },
	{ titulo: 'producto 4', descripcion: algo, precio: 2380 , codigo:'2123' , stock:25},
	{ titulo: 'producto 5', descripcion: algo, precio: 5140, codigo:'4433' , stock:14 },
	{ titulo: 'producto 6', descripcion: algo, precio: 4100 , codigo:'2733' , stock:18},
]

const insertarProductos = (productosBD, prods) => {
	baseDeDatoSql('productosBD').insert(productos)
		.then(prods => console.log('prods'))
		.catch(error => { console.log(error); })
		.finally(() => baseDeDatoSql.destroy()) 
}


export { insertarProductos }




