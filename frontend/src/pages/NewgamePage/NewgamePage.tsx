import {Input} from "./components/Input";
import styled from "styled-components";
import {footerHeight, headerHeight, Layout} from "../../components/Layout";
import React from "react";
import {SettingsContainer} from "./components/GameSettings";
import {SelectGameMode} from "./components/Select";
import {Button} from "./components/Button";
import {GameRoom, GameRoomItem, GameRoomList} from "./components/GameRoomList";

const NewgameBody = styled.div`
  border: 1px solid white;
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;


export const NewgamePage = () => {

    const gameRooms: GameRoom[] = [
        {
            id: "1",
            name: "Test Room Name",
            player1: "IchMachDichPlatt",
            player2: "IchDichAuch",
            guests: [
                "Gast1",
                "Gast2",
            ]
        },
        {
            id: "1",
            name: "Test Room Name",
            player1: "IchMachDichPlatt",
            player2: "IchDichAuch",
            guests: [
                "Gast1",
                "Gast2",
            ]
        },
        {
            id: "1",
            name: "Test Room Name",
            player1: "IchMachDichPlatt",
            player2: "IchDichAuch",
            guests: [
                "Gast1",
                "Gast2",
            ]
        }
    ]


    const createGameSession = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await fetch(`/api/joke/`, {
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE',
        });
    };
    return (
        <Layout>
            <NewgameBody>
                <h1 style={{textAlign: 'center'}}> New Game</h1>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <SettingsContainer/>
                    <div>
                        <div style={{textAlign: "center"}}>
                            <h2> Game Room List </h2>
                        </div>
                        <GameRoomList>
                            {gameRooms.map((gameRoom) => (
                                <GameRoomItem
                                    key={gameRoom.id}
                                    onClick={() => {
                                    }}

                                    gameRoom={gameRoom}
                                />
                            ))}

                        </GameRoomList>
                    </div>
                </div>
            </NewgameBody>
        </Layout>
    );
};