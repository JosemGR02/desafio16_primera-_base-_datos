
import { baseDeDatoSql } from './conexion/index.js';

// CREAR TABLA PRODUCTOS

baseDeDatoSql.schema.createTable('productosBD', table => {
	table.increments('id')
	table.string('titulo')
	table.string('descripcion')
	table.string('codigo')
	table.string('imagen')
	table.integer('precio')
	table.integer('stock')
})

.then(() => console.log('Tabla creada correctamente'))
.catch(error => { console.log(error); })
.finally(() => baseDeDatoSql.destroy())

