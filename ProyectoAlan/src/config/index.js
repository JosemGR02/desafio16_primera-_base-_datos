import dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILENAME = "products";
const MESSAGES_FILENAME = "messages";

const DATABASES = {
    sql: { name: "sql" },
    memory: { name: "memory" },
    filesystem: {
        name: "filesystem",
        collections: { PRODUCTS_FILENAME, MESSAGES_FILENAME },
    },
};

const selectedDB = process.env.SELECTED_DATABASE ?? DATABASES.memory.name;

const config = {
SERVER: {
    PORT: process.env.PORT || 8080,
    },
    SELECTED_DATABASE: DATABASES[selectedDB],
    DATABASES,
    knex: {
        mysql: {
            client: "mysql",
            connection: {
                host: process.env.DATABASE_HOST ?? "127.0.0.1",
                port: process.env.DATABASE_PORT ?? 3306,
                user: process.env.DATABASE_USER ?? "root",
                database: process.env.DATABASE_NAME ?? "clase_16_32140",
            },
        },
        sqlite: {
            client: "sqlite3",
            connection: {
                // 🚧 crear las carpetas correspondientes de forma manual!
                filename: "./src/db/sqlite/ecommerce.sqlite",
            },
        },
    },
};

export { config };

