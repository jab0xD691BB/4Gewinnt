export interface GameStep {
    player_id: string;
    color: string;
    x: number;
    y: number;
    step: number;
}

export enum GameStateEnum {
    NOT_STARTED,
    IN_PROGRESS,
    HAS_WINNER,
    TIE,
    INTERRUPTED,
}

export interface GameState {
    winner: string | undefined;
    active_player: string | undefined;
    players: Map<string, Player>;
    state: GameStateEnum;
    steps: GameStep[];
}

export interface Player {
    name: string;
    color: string;
    time: number;
}

interface Direction {
    x: number;
    y: number;
}


export class game {
    private state: GameState;
    private readonly game_board: number[][];
    private directions: Direction[];

    constructor(
        private width: number = 7,
        private height: number = 6,
        private connect: number = 4
    ) {
        if (connect > width || connect > height) {
            throw new Error(
                `Win parameters exceed board!`
            )
        }

        this.state = {
            winner: undefined,
            active_player: undefined,
            players: new Map<string, Player>(),
            state: GameStateEnum.NOT_STARTED,
            steps: new Array<GameStep>()
        } as GameState;

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
    set game(game: GameState) {
        this.state = game;

        for (let step: number = 1; step < this.state.steps.length; step++) {
            this.game_board[this.state.steps[step].x][this.state.steps[step].y] = step;
        }
    }


    /**
     * Sets the game state
     * @param game_state : GameStateEnum
     */
    set gameState(game_state: GameStateEnum) {
        this.state.state = game_state;
    }

    /**
     * Adds or updates Player object for the game to use
     * @param id : string
     * @param name : string
     * @param color : string
     * @param time : number
     */
    addPlayer(id: string, name: string, color: string, time: number) {
        this.state.players.set(
            id,
            {
                name: name,
                color: color,
                time: time
            } as Player);
    }

    private start_step(): GameStep {
        return {
            player_id: "Board Dimensions",
            color: "Do not display!",
            x: this.width,
            y: this.height,
            step: 0,
        }
    }

    private create_step(x: number, y: number): GameStep {
        this.check_active_player();
        return {
            player_id: this.state.active_player!,
            color: this.state.players.get(this.state.active_player!)!.color,
            x: x,
            y: y,
            step: this.state.steps.length - 1,
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
    activatePlayer(id: string) {
        if (this.state.players.get(id) === undefined) {
            throw new Error(
                `Player with that ID does not exist!`
            )
        } else {
            this.state.active_player = id;
            this.state.state = GameStateEnum.IN_PROGRESS;
        }
    }

    /**
     * Attempts to insert a piece in the given column.
     * Returns GameStep when successful or undefined if failed
     *
     * Sets active_player to undefined
     * Checks if game-over conditions have been met
     * @param column : number
     *
     * @return GameStep | undefined
     */
    insert(column: number): GameStep | undefined {
        if (this.state.state !== GameStateEnum.IN_PROGRESS) {
            return undefined;
        }

        let row: number = 0;
        while (this.game_board[column][row] !== 0) {
            row++;
            if (row === this.height) {
                return undefined;
            }
        }
        this.state.steps.push(this.create_step(column, row));
        this.game_board[column][row] = this.state.steps.length - 1;

        this.has_winner(column, row);
        this.state.active_player = undefined;

        return this.state.steps[this.state.steps.length - 1];
    }

    private has_winner(x: number, y: number, player_id: string | undefined = this.state.active_player) {
        this.directions.forEach((direction) => {
            if (this.state.steps.length + 1 === this.width * this.height) {
                this.state.state = GameStateEnum.TIE;
                return;
            }
            let points = 0;
            let xi = x;
            let yi = y;
            while (
                game.in_range(xi, this.width) &&
                game.in_range(yi, this.height) &&
                this.state.steps[this.game_board[xi][yi]].player_id === player_id) {
                if (++points === this.connect) {
                    this.state.state = GameStateEnum.HAS_WINNER;
                    this.state.winner = player_id;
                    return;
                }
                xi += direction.x;
                yi += direction.y;
            }
        })


    }

    private static in_range(x: number, exclMax: number, incMin: number = 0) {
        return (x >= incMin && x < exclMax);
    }

    /**
     * Returns the steps of the game, with the first element representing the board dimensions.
     *
     * @return GameStep[]
     */
    get gameSteps(): GameStep[] {
        return this.state.steps;
    }

    /**
     * Returns the current game state
     *
     * @return GameState
     */
    get game(): GameState {
        return this.state;
    }
}

