import express from "express";
import { globalRouter } from "./router/global.router";
import { createDatabaseConnection } from "./util/createDatabaseConnection";
import bodyParser from "body-parser";
import { Socket, Server } from "socket.io";
import { createServer } from "http";

const port = 4000;

const cport = 3000;
const host = "localhost";
const corsOrigin = "http://localhost:4000";

export const startServer = async () => {
  const dbConnection = await createDatabaseConnection();
  const app = express();

  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      credentials: true,
    },
  });
  io.of("/newgame").on("connection", (socket: Socket) => {
    console.log("connected client: " + socket.id);
  });

  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    console.log("Time:", new Date());
    next();
  });
  app.use("/api", globalRouter);
  const server = httpServer.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

  return { server, dbConnection };
};

startServer();
