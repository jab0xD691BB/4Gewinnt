import { getRepository } from "typeorm";
import { Move } from "../entity/move.model";
import { RequestHandler, Request, Response } from "express";

//// CRUD Functions 

// Get all Moves
export const getAllMoves = async (req: Request, res: Response) => {
    const moveRepository = await getRepository(Move);
    const moves =  await moveRepository.find() ;
    res.send({ 
      data: moves
    });
  };
  
  // Get one Move
  export const getMove = async (req: Request ,res: Response) => {
    const moveid = req.params.moveId;
    const moveRepository = await getRepository(Move);
    const move = await moveRepository.findOneOrFail(moveid);
    try {
      res.send({data:move});
    } catch (error) {
      res.status(404).send({status: 'Game not found'});
    }
  };

  // Create a Move
export const createMove = async (req: Request, res: Response) => {
    const {createdAt} = req.body;
    const move = new Move();
    move.createdAt = createdAt;
  
    const moveRepository = await getRepository(Move);
    const createdMove = await moveRepository.save(move);
  
    res.send({
      data: createdMove,
    });
  };
  
  // Delete Game
  export const deleteMove = async (req: Request, res: Response) => {
    const moveid = req.params.moveId;
    const moveRepository = await getRepository(Move);
    try {
      const move = await moveRepository.findOneOrFail(moveid);
      await moveRepository.remove(move);
      res.send({});
    } catch (error) {
      res.status(404).send({
        status: 'Move not found'
      });
    }
  };