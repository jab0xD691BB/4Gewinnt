export interface GameStep {
    player_id: string;
    color: string;
    x: number;
    y: number;
    step: number;
    date: Date;
}

export enum GameStateEnum {
    NOT_STARTED,
    IN_PROGRESS,
    SUSPENDED,
    HAS_WINNER,
    TIE,
    INTERRUPTED,
}

export enum PlayerStateEnum {
    ACTIVE,
    FINISHED,
    NOT_STARTED,
}

export interface GameState {
    connect: number,
    winner: string | undefined;
    active_player: string;
    active_player_state: PlayerStateEnum;
    active_start: Date | undefined;
    players: Map<string, Player>;
    state: GameStateEnum;
    steps: GameStep[];
    date: Date;
}

export interface Player {
    id: string;
    name: string;
    color: string;
    time: number;
    time_bonus: number;
}

interface Direction {
    x: number;
    y: number;
}


export class Game {
    private state: GameState;
    private readonly game_board: number[][];
    private directions: Direction[];

    constructor(
        private width: number = 7,
        private height: number = 6,
        connect: number = 4
    ) {
        if (connect > width || connect > height) {
            throw new Error(
                `Win parameters exceed board!`
            )
        }

        this.state = {
            connect: connect,
            winner: undefined,
            active_player: undefined,
            players: new Map<string, Player>(),
            state: GameStateEnum.NOT_STARTED,
            steps: new Array<GameStep>(),
            date: new Date(),
        } as unknown as GameState;

        this.state.steps.push(this.start_step());

        this.game_board = new Array<number>(this.width)
            .fill(0)
            .map(() =>
                new Array<number>(this.height).fill(0)
            );

        this.directions = [
            {x: -1, y: -1},
            {x: -1, y: 0},
            {x: -1, y: 1},
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 1, y: 0},
            {x: 1, y: -1},
            {x: 0, y: -1}
        ];
    }

    /**
     * Imports the state of the game received from the Server
     * @param game : GameState
     */
    public set game(game: GameState) {
        this.state = game;

        for (let step: number = 1; step < this.state.steps.length; step++) {
            this.game_board[this.state.steps[step].x][this.state.steps[step].y] = step;
        }
    }


    /**
     * Sets the game state
     * @param game_state : GameStateEnum
     */
    public set gameState(game_state: GameStateEnum) {
        this.state.state = game_state;
    }

    /**
     * Adds or updates Player object for the game to use
     * @param id : string
     * @param name : string
     * @param color : string
     * @param time : number - Total time in ms
     * @param time_bonus : number (optional) - Default 3000(ms)
     */
    public addPlayer(id: string, name: string, color: string, time: number, time_bonus: number = 3000) {
        this.state.players.set(
            id,
            {
                name: name,
                color: color,
                time: time,
                time_bonus: time_bonus,
            } as Player);
    }

    /**
     * Activates the next player in the game or sets the first player as active if none was active before.
     */
    public cyclePlayer() {
        let keys = Array.from( this.state.players.keys() );
        for(let i: number = 0; i < keys.length; i++) {
            if (keys[i] === this.state.active_player) {
                this.activatePlayer(i+1 === keys.length ? keys[0] : keys[i+1]);
                return;
            }
        }
        this.activatePlayer(keys[0]);
    }

    private start_step(): GameStep {
        return {
            player_id: "Board Dimensions",
            color: "#00000",
            x: this.width,
            y: this.height,
            step: 0,
            date: this.state.date,
        }
    }

    private create_step(x: number, y: number): GameStep {
        return {
            player_id: this.state.active_player!,
            color: this.state.players.get(this.state.active_player!)!.color,
            x: x,
            y: y,
            step: this.state.steps.length - 1,
            date: new Date(),
        }
    }

    private check_active_player(): boolean {
        if (this.state.active_player) {
            return true;
        }
        throw new Error(
            `No player was set as active!`
        )
    }

    /**
     * Marks the player with the given ID as active.
     * Sets the game state as IN_PROGRESS.
     * The next move will be performed as the active player.
     * @param id : string
     */
    public activatePlayer(id: string = this.state.active_player) {
        if (this.state.players.get(id) === undefined) {
            throw new Error(
                `Player with that ID does not exist!`
            )
        } else {
            this.state.active_player_state = PlayerStateEnum.ACTIVE;
            this.state.active_player = id;
            this.state.active_start = new Date();

            if (this.state.state === GameStateEnum.NOT_STARTED) {
                this.state.state = GameStateEnum.IN_PROGRESS;
            }
        }
    }

    /**
     * Sets active_player to undefined and performs game-over checks.
     *
     * @param add_bonus_time : boolean - Decides whether to add the time_bonus defined for the active player.
     */
    public stopPlayer(add_bonus_time: boolean = false) {
        if (this.state.active_player !== undefined) {
            let time_bonus = add_bonus_time ? this.state.players.get(this.state.active_player!)!.time_bonus : 0;
            this.state.players.get(this.state.active_player!)!.time +=
                time_bonus -
                (new Date().getTime() - this.state.active_start!.getTime());
            this.has_winner(
                this.state.steps[this.state.steps.length-1].x,
                this.state.steps[this.state.steps.length-1].y
            );
            this.state.active_player_state = PlayerStateEnum.FINISHED;
            this.state.active_start = undefined;
        }
    }

    /**
     * Attempts to insert a piece in the given column as the active player.
     * Returns GameStep when successful or undefined if failed.
     *
     * Sets active_player to undefined.
     * Checks if game-over conditions have been met.
     * @param column : number
     *
     * @exception Error if no active player is set.
     *
     * @return GameStep | undefined
     */
    public insert(column: number): GameStep | undefined {
        if (this.state.state !== GameStateEnum.IN_PROGRESS) {
            return undefined;
        }
        this.check_active_player();

        let row: number = 0;
        while (this.game_board[column][row] !== 0) {
            row++;
            if (row === this.height) {
                return undefined;
            }
        }
        this.state.steps.push(this.create_step(column, row));
        this.game_board[column][row] = this.state.steps.length - 1;

        this.stopPlayer(true);
        this.cyclePlayer();

        return this.state.steps[this.state.steps.length - 1];
    }

    private has_winner(
        x: number,
        y: number,
        player_id: string = this.state.steps[this.state.steps.length-1].player_id)
    {
        this.directions.forEach((direction) => {
            if (this.state.steps.length + 1 === this.width * this.height) {
                this.state.state = GameStateEnum.TIE;
                return;
            }
            let points = 0;
            let xi = x;
            let yi = y;
            while (
                Game.in_range(xi, this.width) &&
                Game.in_range(yi, this.height) &&
                this.state.steps[this.game_board[xi][yi]].player_id === player_id) {
                if (++points === this.state.connect) {
                    this.state.state = GameStateEnum.HAS_WINNER;
                    this.state.winner = player_id;
                    return;
                }
                xi += direction.x;
                yi += direction.y;
            }
        });
    }

    private static in_range(x: number, exclMax: number, incMin: number = 0) {
        return (x >= incMin && x < exclMax);
    }

    /**
     * Returns the steps of the game, with the first element representing the board dimensions.
     *
     * @return GameStep[]
     */
    public get gameSteps(): GameStep[] {
        return this.state.steps;
    }

    /**
     * Returns the current game state
     *
     * @return GameState
     */
    public get game(): GameState {
        return this.state;
    }

    public get gameBoard(): number[][] {
        return this.game_board;
    }
}

