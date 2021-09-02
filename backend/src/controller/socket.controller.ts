import { ServerOptions, Socket, Server } from "socket.io";

interface Player {
  name: String;
}
type GameSettings = {
  boardWidth: string;
  boardHeigth: string;
  rowCountToWin: string;
  time: string;
  gameMode: string;
  bestOf: string;
  rated: string;
};

type GameRoom = {
  id: string;
  name: string;
  player1: string;
  player2: string;
  guests: string[];
  gameSetting: GameSettings;
};

const players: Record<string, string> = {};
const rooms: Record<string, GameRoom> = {};

export const socket = ({ io }: { io: Server }) => {
  console.log("sockets");

  io.on("connection", (socket: Socket) => {
    socket.on("connectplayer", (message: any) => {
      // player.name = message.name;
      console.log({ message });
      console.log("id: " + socket.id);
      players[message.name] = socket.id;
      console.log(players);

      let returnRooms: Array<GameRoom> = [];
      for (let key in rooms) {
        let room = rooms[key];
        returnRooms.push(room);
      }

      socket.emit("joinNewPage", {
        settings: returnRooms,
      });
    });

    socket.on("createroom", (message: any) => {
      console.log("test socket in room", socket.id in rooms);
      const settings: GameRoom = message;
      console.log(message);
      if (players[socket.id] in rooms === false) {
        rooms[players[message.name]] = settings;
        socket.join(players[socket.id]);

        socket.broadcast.emit("createroom", {
          settings: rooms[players[message.name]],
        });
        socket.emit("createroom", {
          settings: rooms[players[message.name]],
        });
      }
    });

    socket.once("disconnect", () => {
      console.log("disconnect " + socket.id);
    });
  });
};
