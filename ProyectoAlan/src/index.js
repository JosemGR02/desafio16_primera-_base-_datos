import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { MessagesDao, ProductDao } from "./Dao/index.js";
import { DATE_UTILS } from "./utils/index.js";

const PORT = 8080;

const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.emit("mensajes", await MessagesDao.getAll());

  socket.on("mensajeNuevo", async ({ email, text }) => {
    const message = { email, text, timestamp: DATE_UTILS.getTimestamp() };
    await MessagesDao.save(message);

    io.sockets.emit("mensajes", await MessagesDao.getAll());
  });

  socket.emit("products", await ProductDao.getAll());

  socket.on("add-product", async (data) => {
    await ProductDao.save(data);
    io.sockets.emit("products", await ProductDao.getAll());
  });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});

