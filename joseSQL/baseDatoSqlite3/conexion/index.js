
// CONFIGURACION BD SQLITE3

const configuracion2 = {
	client: 'sqlite3',
	connection: {
		filename:'./src/db.sqlite'
	}
}

import { baseDeDatoSqlite3 } from 'knex';(configuracion2)

export { baseDeDatoSqlite3 }


//const baseDeDatoSqlite3 = require('knex')(configuracion2)

// mensajes

