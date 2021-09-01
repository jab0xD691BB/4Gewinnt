import { Router } from "express";
<<<<<<< HEAD
import { playerRouter } from "./player.router";
import { gameRouter } from "./game.router";
import { moveRouter } from "./move.router";
=======
import { gameRouter } from "./game.router";
import { moveRouter } from "./move.router";
import { playerRouter } from "./player.router";
>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a

export const globalRouter = Router({ mergeParams: true });

interface HelloWorldReponse {
  message: string;
}
globalRouter.get("/", (req, res) => {
  res.send({ message: "hello world global" } as HelloWorldReponse);
});

<<<<<<< HEAD
globalRouter.use("/user", playerRouter);

=======
>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a
//player router
globalRouter.use("/player", playerRouter);
//game router
globalRouter.use("/game", gameRouter);
// move move
<<<<<<< HEAD
globalRouter.use("/move", moveRouter);
=======
globalRouter.use("/move", moveRouter);

>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a
