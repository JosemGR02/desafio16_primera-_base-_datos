import { config } from "../config/index.js";
import { ContainerMemory,ContainerFilesystem,SQLContainer,} from "../Containers/index.js";
import { KnexService } from "../services/index.js";

// Aca podríamos importar todos nuestros "Containers base", y crear las instancias correspondientes. Luego las exportamos para que puedan ser usadas en otros archivos
// También nos sirve para seleccionar un tipo de instancia. Acá lo que hacemos es elegir entre Memoria y Archivo dependiend de la variable PRODUCTS_FILENAME

const ALL_DATABASES = {
  filesystem: () => ({
    ProductDao: new ContainerFilesystem(
      config.DATABASES.filesystem.collections.PRODUCTS_FILENAME
    ),
    MessagesDao: new ContainerFilesystem(
      config.DATABASES.filesystem.collections.MESSAGES_FILENAME
    ),
  }),
  memory: () => ({
    ProductDao: new ContainerMemory(),
    MessagesDao: new ContainerMemory(),
  }),
  sql: () => {
    //esto es para que se invoquen las funciones que tiene ese service, para comprobar y crear las tablas
    KnexService.init();
    return {
      ProductDao: new SQLContainer(KnexService.KnexMySQL, "productos"),
      MessagesDao: new SQLContainer(KnexService.KnexMySQL, "messages"),
    };
  },
};

export const { ProductDao, MessagesDao } =
  ALL_DATABASES[config.SELECTED_DATABASE.name]();


