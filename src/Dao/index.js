import { config } from "../Configuracion/config.js";
import { ContenedorSQL, ContenedorMemoria, ContenedorFilesystem } from "../Contenedores/index.js";
import { servicioKnex } from "../Servicios/servicio.js";


const TODAS_BASES_DATOS = {
  filesystem: () => ({
    daoProductos: new ContenedorFilesystem(
      config.BASESdDATOS.filesystem.colecciones.PRODUCTOS_ARCHIVONOMBRE
    ),
    daoMensajes: new ContenedorFilesystem(
      config.BASESdDATOS.filesystem.colecciones.MENSAJES_ARCHIVONOMBRE
    ),
  }),

  memory: () => ({
    daoProductos: new ContenedorMemoria(),
    daoMensajes: new ContenedorMemoria(),
  }),

  sql: () => {
    servicioKnex.init();
    return {
      daoProductos: new ContenedorSQL(servicioKnex.KnexMySQL, "productos"),
      daoMensajes: new ContenedorSQL(servicioKnex.KnexSqlite, "mensajes"),
    };
  },
};


export const { daoProductos, daoMensajes } = TODAS_BASES_DATOS[config.SELECCION_BASEDATOS.nombre]();