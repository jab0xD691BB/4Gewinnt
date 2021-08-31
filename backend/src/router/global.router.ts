import { Router } from "express";
import { gameRouter } from "./game.router";
import { moveRouter } from "./move.router";
import { playerRouter } from "./player.router";

export const globalRouter = Router({ mergeParams: true });

interface HelloWorldReponse {
  message: string;
}
globalRouter.get("/", (req, res) => {
  res.send({ message: "hello world global" } as HelloWorldReponse);
});

//player router
globalRouter.use("/player", playerRouter);
//game router
globalRouter.use("/game", gameRouter);
// move move
globalRouter.use("/move", moveRouter);

