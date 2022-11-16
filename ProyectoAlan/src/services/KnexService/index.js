import knex from "knex";
import { config } from "../../config/index.js";
import { DATASETS } from "./datasets/index.js";

const KnexMySQL = knex(config.knex.mysql);
const KnexSqlite = knex(config.knex.sqlite);
// esto se podría hacer con knex migrations, pero por ahora estamos bien.
const addDatasets = async (knexConnector, data, tableName) => {
  await knexConnector.insert(data).into(tableName);
};

const createProductTable = async (selectedKnex) => {
  try {
    const tableExist = await selectedKnex.schema.hasTable("productos");
    if (tableExist) return;

    await selectedKnex.schema.createTable("productos", (table) => {
      table.increments();
      table.string("title");
      table.integer("price");
      table.string("thumbnail");
    });

    await addDatasets(selectedKnex, DATASETS.products, "productos");
  } catch (error) {
    // habria que manejar todos estos errores, por ejemplo este es clave, si falla la creación, deberíamos hacer algo y en el peor de los casos finalizar la ejecución del server
    console.error(error);
  }
};

const createMessagesTable = async (selectedKnex) => {
  try {
    const tableExist = await selectedKnex.schema.hasTable("messages");
    if (tableExist) return;

    await selectedKnex.schema.createTable("messages", (table) => {
      table.increments("id");
      table.string("email");
      table.string("text");
      table.string("timestamp");
    });

    await addDatasets(selectedKnex, DATASETS.messages, "messages");
  } catch (error) {
    console.error(error);
  }
};

const init = async () => {
  // acá le paso el knex que quiero, para crear cada tabla en la DB que quiero (podriamos usar productos con mysql y messages en sqlite como pide la consigna, pero si se fijan en DAO/index.js, yo puse que las dos sean mysql  )
  await createProductTable(KnexMySQL);
  await createMessagesTable(KnexMySQL);
};

const KnexService = {
  init,
  KnexMySQL,
  KnexSqlite,
};

export { KnexService };

