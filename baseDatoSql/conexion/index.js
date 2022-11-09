
// CONFIGURACION BD SQL

const configuracion = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'test'
	}
}

import { baseDeDatoSql } from 'knex';(configuracion)


export { baseDeDatoSql }


// productos


// const baseDeDatoSql = require('knex')(configuracion)
// module.exports = { baseDeDatoSql }




