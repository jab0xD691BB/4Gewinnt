<<<<<<< HEAD
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as yup from "yup";
import { GameSettings } from "./gameSettings.model";
=======
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as yup from "yup";
>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a
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

<<<<<<< HEAD
  @ManyToOne (type => Player, player => player.id)
  @JoinColumn() 
  winner!: Player;

  @ManyToMany (type => Player, player => player.games)
  @JoinTable()
  players!: Player[];

  @OneToMany (type => Move, move => move.game)
  @JoinColumn()
  moves!: Move[];

  @OneToMany (type => GameSettings, gamesettings => gamesettings.games)
  @JoinColumn()
  settings! : GameSettings;
=======
  @OneToOne (type => Player)
  winner!: Player;

  @ManyToMany (type => Player, player => player.games)
  players!: Player[];

  @OneToMany (type => Move, move => move.game)
  moves!: Move[];
>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a
  
}
