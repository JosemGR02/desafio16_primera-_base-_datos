
import { baseDeDatoSql } from './conexion/index.js';

// ELIMINAR TODOS LOS PRODUCTOS

const eliminarTodosProds = (productosBD, id) => {
	baseDeDatoSql.from('productosBD').del()
		.then(() => console.log('Todos los productos fueron eliminados correctamente'))
		.catch(err => { console.log(err); })
		.finally(() => baseDeDatoSql.destroy())
}

export { eliminarTodosProds }




