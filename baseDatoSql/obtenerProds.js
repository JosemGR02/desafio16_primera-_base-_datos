
import { baseDeDatoSql } from './conexion/index.js';

// OBTENER PRODUCTOS

const obtenerTodosProds = (productosBD, id) => {
	baseDeDatoSql.from('productosBD').select('*')
		.then(rows => {
			rows.forEach(row => {
			console.log(`${row['id']} ${row['titulo']} ${row['descripcion']} ${row['codigo']} ${row['precio']} ${row['stock']}`);
			});
		})
		.catch(error => console.log(error))
		.finally(() => baseDeDatoSql.destroy())
}


export { obtenerTodosProds }




//  for (row of rows) {
//	  console.log(`${row['id']} ${row['titulo']} ${row['precio']} ${row['codigo']} ${row['stock']}`);
//  }

