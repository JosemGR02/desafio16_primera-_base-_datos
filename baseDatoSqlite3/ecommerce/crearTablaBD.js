
// CREAR TABLA MENSAJES

import { baseDeDatoSqlite3 } from '../conexion/index.js';

baseDeDatoSqlite3.schema.createTable('mensajes', table => {
	table.increments('id')
	table.string('autor')
	table.string('mensaje')
	table.integer('tiempo')
})
.then(() => console.log('Tabla creada correctamente'))
.catch(error => { console.log(error); })
.finally(() => baseDeDatoSqlite3.destroy())

