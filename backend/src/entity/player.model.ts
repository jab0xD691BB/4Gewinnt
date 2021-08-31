import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany, OneToMany, 
  } from "typeorm";
  import * as yup from "yup";
  import { Game } from "./game.model";
  import { Move } from "./move.model";
  import { IsEmail, MinLength } from "class-validator";
  
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
    @IsEmail()
    email!: string;
  
    @Column()
    password?: string;
  
    @Column()
    @MinLength(3, {
      message: "Name is too short",
    })
    name!: string;
  
    @CreateDateColumn()
    createdAt: string =  new Date().toDateString();
  
    @UpdateDateColumn()
    updatedAt: string = new Date().toDateString();

    @ManyToMany (type => Game, game => game.players)
    games!: Game[];
  
    @OneToMany (type => Move, move => move.player)
    moves!: Move[];
  
    /* @Column()
    settings!: Array<string>;
  
    @Column()
    score!: Array<string>; */
  
  }
  