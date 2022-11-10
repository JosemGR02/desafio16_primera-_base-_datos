
import { baseDeDatoSql } from './conexion/index.js';

// ELIMINAR PRODUCTO X ID

const eliminarProdXid = (productosBD, id) => {
	baseDeDatoSql.from('productosBD').where({id: id}).del()
		.then((val) => console.log('Producto eliminado: ',val))
		.catch(error => { console.log(error); })
		.finally(() => baseDeDatoSql.destroy())
}


export { eliminarProdXid }


