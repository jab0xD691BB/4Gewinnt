import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany, OneToMany, JoinTable, 
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

    @Column({nullable: true,
      default: null})
    preferredTheme!: string;

    @Column({nullable: true,
      default: null})
    eloScore!: number;
  
    @CreateDateColumn()
    createdAt!: string ;
  
    @UpdateDateColumn()
    updatedAt!: string ;

    @ManyToMany (type => Game, game => game.players)
    //@JoinTable()
    games!: Game[];

    @OneToMany (type => Game, game => game.winner)
    gamesWon! : Game[];
  
    /* @OneToMany (type => Move, move => move.player)
    moves!: Move[]; */

    /* constructor(playerid:string, playerEmail:string, playername:string,playerPassword:string, playerpreferredTheme:string, playerEloScore:number, playerCreatedAt:string, playerUpdatedAt:string, games:Array<Game>) {
      this.id= playerid;
      this.email = playerEmail;
      this.password= playerPassword;
      this.preferredTheme= playerpreferredTheme;
      this.eloScore= playerEloScore;
      this.name = playername;
      this.createdAt= playerCreatedAt;
      this.updatedAt=playerUpdatedAt;
      this.games = games;
    }
   */
  }
  
