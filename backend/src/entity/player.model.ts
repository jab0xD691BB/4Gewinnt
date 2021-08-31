import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as yup from "yup";
import { Game } from "./game.model";
import { Move } from "./move.model";

export const playerSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  //....
});

@Entity()
export class Player {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;
  
  @Column()
  email!: string;

  @ManyToMany (type => Game, game => game.players)
  games!: Game[];

  @OneToMany (type => Move, move => move.player)
  moves!: Move[];

  /* @Column()
  settings!: Array<string>;

  @Column()
  score!: Array<string>; */
}
