
import { baseDeDatoSql } from './conexion/index.js';

// OBTENER PRODUCTO X ID

const obtenerProdXid = (productosBD, id) => {
    baseDeDatoSql.from('productosBD').where({id: id}).select()
        .then((prod) => console.log(prod))
        .catch(error => { console.log(error);  })
        .finally(() => baseDeDatoSql.destroy())
}


export { obtenerProdXid }


