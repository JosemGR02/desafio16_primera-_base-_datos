
import { obtenerTodosProds } from '../baseDatoSql/obtenerProds.js';
import { obtenerProdXid } from '../baseDatoSql/obtenerProdXid.js';
import { insertarProductos } from '../baseDatoSql/insertarProds.js';
import { actualizarProductos } from '../baseDatoSql/actualizarProd.js';
import { eliminarProdXid } from '../baseDatoSql/eliminarProdXid.js';
import { eliminarTodosProds } from '../baseDatoSql/eliminarTodosProds.js';



class ContenedorSQL {
    constructor(productosBD) {
        this.productosBD = productosBD;
    }

    async obtenerTodos() {
        try {
            const elementos = await obtenerTodosProds(this.productosBD)
            return elementos
        } 
        catch (error) {
            console.log(error, "no se pudo obtener todos los elementos");
        }
    }

    async guardar(elemento) {
        try {
            await insertarProductos(this.productosBD, elemento)
        } catch (error) {
            console.log(error, "no se pudo guardar el elemento/elementos seleccionados");
        }
    }

    async obtenerXid(id) {
        try {
            return await obtenerProdXid(this.productosBD, id)
        } catch (error) {
            console.log(error, "no se pudo obtener el elemento seleccionado");
        }
    }

    async actualizar(id, elementoMod) {
        try {
            await actualizarProductos(this.productosBD, id, elementoMod)
        } 
        catch (error) {
            console.log(error, "no se pudo actualizar el elemento seleccionado");
        }
    }

    async eliminarXid(id) {
        try {
            return await eliminarProdXid(this.productosBD, id)
        } 
        catch (error) {
            console.log(error, "no se pudo eliminar el elemento seleccionado" );
        }
    }

    async eliminarTodos() {
        try {
            return await eliminarTodosProds(this.productosBD)
        } 
        catch (error) {
            console.log(error, "no se pudo eliminar todos los elementos");
        }
    }
}

export { ContenedorSQL };

