
class ContenedorSQL {
    constructor(baseDeDatoSql, productosBD) {
        this.knex = baseDeDatoSql;
        this.tablaBD = productosBD;
    }

    async obtenerTodos() {
        try {
            const respuesta = await this.knex.select("*").from(this.tablaBD);
            return respuesta;
        } catch (error) {
            console.log(error, "no se pudo obtener todos los elementos");
        }
    }

    async guardar(elemento) {
        try {
            const respuesta = await this.knex.insert(elemento).into(this.tablaBD);
            return respuesta;
        } 
        catch (error) {
            console.log(error, "no se pudo guardar el elemento/elementos seleccionados");
        }
    }

    async obtenerXid(id) {
        try {
            const respuesta = await this.knex.select(id).from(this.tablaBD);
            return respuesta;
        } 
        catch (error) {
            console.log(error, "no se pudo obtener el elemento seleccionado");
        }
    }

    async actualizar(id, elementoMod) {
        try {
            const respuesta = await this.knex.update(id).from(this.tablaBD, elementoMod);
            return respuesta;
        } 
        catch (error) {
            console.log(error, "no se pudo actualizar el elemento seleccionado");
        }
    }

    async eliminarXid(id) {
        try {
            const respuesta = await this.knex.del(id).from(this.tablaBD);
            return respuesta;
        } 
        catch (error) {
            console.log(error, "no se pudo eliminar el elemento seleccionado" );
        }
    }

    async eliminarTodos() {
        try {
            const respuesta = await this.knex.del("*").from(this.tablaBD);
            return respuesta;
        } 
        catch (error) {
            console.log(error, "no se pudo eliminar todos los elementos");
        }
    }
}

export { ContenedorSQL };
