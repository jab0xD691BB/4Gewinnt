import {Input, InputRadio} from "./components/Input";
import styled from "styled-components";
import {footerHeight, headerHeight, Layout} from "../../components/Layout";
import React from "react";
import {SettingsContainer} from "./components/GameSettings";
import {SelectGameMode} from "./components/Select";
import {Button} from "./components/Button";

const NewgameBody = styled.div`
  border: 1px solid white;
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;
/*
export const NewgamePage = () => {
    return (
        <Layout>
            <NewgameBody>
                <h1 style={{textAlign: 'center'}}> New Game</h1>
                <SettingsContainer/>
            </NewgameBody>
        </Layout>
    );
};*/


export const NewgamePage = () => {

    const createGameSession = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await fetch(`/api/joke/`, {
            headers: { 'Content-Type': 'application/json'},
            method: 'DELETE',
        });
    };
    return (
        <Layout>
            <NewgameBody>
                <h1 style={{textAlign: 'center'}}> New Game</h1>
                <SettingsContainer/>
            </NewgameBody>
        </Layout>
    );
};
/*
    return (
        <Layout>
            <NewgameBody>
                <h1 style={{textAlign: 'center'}}> New Game</h1>
                <div style={{}}>
                    <div style={{width: 300, paddingLeft: 20}}>
                        <h2> Settings</h2>
                        <Input
                            name="boardWidth"
                            label="Board Width"
                            type="number"
                            step="1.00"
                            min="1"
                            max="10"
                            //            onChange={fieldDidChange}
                            required
                            //            value={values.funnyCounter}
                        />
                        <Input
                            name="boardHeigth"
                            label="Board Heigth"
                            type="number"
                            step="1.00"
                            //            onChange={fieldDidChange}
                            required
                            //            value={values.funnyCounter}
                        />
                        <Input
                            name="rowCountToWin"
                            label="Row Count to win"
                            type="number"
                            step="1.00"
                            //            onChange={fieldDidChange}
                            required
                            //            value={values.funnyCounter}
                        />
                        <Input
                            name="time"
                            label="Time in Minutes"
                            type="number"
                            step="1.00"
                            //            onChange={fieldDidChange}
                            required
                            //            value={values.funnyCounter}
                        />
                        <SelectGameMode
                            name="gameMode"
                            label="Game Mode"
                            option1="Against Human"
                            option2="Against Computer"
                            type="text"
                            //                        step="1.00"
                            //            onChange={fieldDidChange}
                            required
                            //            value={values.funnyCounter}
                        />
                        <Input
                            name="bestOf"
                            label="Best Of"
                            type="number"
                            step="1.00"
                            //            onChange={fieldDidChange}
                            required
                            //            value={values.funnyCounter}
                        />
                        <InputRadio
                            id="rated"
                            name="rated"
                            label="Rated"
                            type="checkbox"
                            //                        step="1.00"
                            //            onChange={fieldDidChange}
                            //                        required
                            //            value={values.funnyCounter}
                        />
                        <Button onClick={createGameSession}>Create Game Session</Button>
                    </div>
                </div>
            </NewgameBody>
        </Layout>
    );
};
*/