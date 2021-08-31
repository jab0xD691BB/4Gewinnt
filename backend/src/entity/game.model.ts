import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as yup from "yup";
import { Move } from "./move.model";
import { Player } from "./player.model";

export const playerSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  //....
});

@Entity()
export class Game {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @CreateDateColumn()
  createdAt!: string;

  @OneToOne (type => Player)
  winner!: Player;

  @ManyToMany (type => Player, player => player.games)
  players!: Player[];

  @OneToMany (type => Move, move => move.game)
  moves!: Move[];
  
}
