import dotenv from "dotenv";
dotenv.config();

const PRODUCTOS_ARCHIVONOMBRE = "productos";
const MENSAJES_ARCHIVONOMBRE = "mensajes";

const BASESdDATOS = {
    sql: { nombre: "sql" },
    memory: { nombre: "memory" },
    filesystem: {
        nombre: "filesystem",
        colecciones: { PRODUCTOS_ARCHIVONOMBRE, MENSAJES_ARCHIVONOMBRE },
    },
};

const seleccionBD = process.env.SELECCION_BASEDATOS ?? BASESdDATOS.memory.nombre;

const config = {
    SERVIDOR: {
        PORT: process.env.PORT || 8080,
    },
    SELECCION_BASEDATOS: BASESdDATOS[seleccionBD], BASESdDATOS,
    knex: {
        mysql: {
            client: "mysql",
            connection: {
                host: process.env.BASEDATOS_HOST ?? "127.0.0.1",
                port: process.env.BASEDATOS_PORT ?? 3306,
                user: process.env.BASEDATOS_USER ?? "root",
                database: process.env.BASEDATOS_NAME ?? "primeraBaseDatos",
            },
            useNullAsDefault: true
        },
        sqlite: {
            client: "sqlite3",
            connection: {
                filename: "./src/BaseDatos/sqlite/ecommerce.sqlite",
            },
            useNullAsDefault: true
        },
    },
};

export { config };
