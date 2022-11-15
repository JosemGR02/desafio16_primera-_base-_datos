
import { baseDeDatoSql } from './conexion/index.js';

// ACTUALIZAR PRODUCTO X ID

const actualizarProductos = (productosBD, id) => {
	baseDeDatoSql.from('productosBD').where({id: id}).update()
		.then((prodActualizado) => console.log('Carrito actualizado correctamente: ',prodActualizado))
		.catch(error => { console.log(error); })
		.finally(() => baseDeDatoSql.destroy())
}


export { actualizarProductos }


