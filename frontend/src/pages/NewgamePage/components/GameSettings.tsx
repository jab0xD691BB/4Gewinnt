import React, {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import {Layout} from "../../../components/Layout";
import {Input, InputRadio} from "./Input";
import {SelectGameMode} from "./Select";
import {Button} from "./Button";
//import {Input} from "./Input";

export const SettingsContainer = () => {

    const [values, setValues] = useState({
        boardWidth: '',
        boardHeigth: '',
        rowCountToWin: '',
        time: '',
        gameMode: 'player',
        bestOf: '',
        rated: ''
    });
    const fieldDidChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value});
    };
    const fieldDidChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const createGameSession = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        var test = JSON.stringify({
            ...values,
        });
        await fetch('/api/match', {
            body: JSON.stringify({
                ...values,
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
        });
    };

    return (
        <form onSubmit={createGameSession} data-testid="edit-game-session-form">
            <div style={{}}>
                <div style={{width: 300, paddingLeft: 20}}>
                    <h2> Settings </h2>
                    <Input
                        name="boardWidth"
                        label="Board Width"
                        type="number"
                        step="1.00"
                        min="1"
                        max="10"
                        onChange={fieldDidChangeInput}
                        required
                        //            value={values.funnyCounter}
                    />
                    <Input
                        name="boardHeigth"
                        label="Board Heigth"
                        type="number"
                        step="1.00"
                        onChange={fieldDidChangeInput}
                        required
                        //            value={values.funnyCounter}
                    />
                    <Input
                        name="rowCountToWin"
                        label="Row Count to win"
                        type="number"
                        step="1.00"
                        onChange={fieldDidChangeInput}
                        required
                        //            value={values.funnyCounter}
                    />
                    <Input
                        name="time"
                        label="Time in Minutes"
                        type="number"
                        step="1.00"
                        onChange={fieldDidChangeInput}
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
                        onChange={fieldDidChangeSelect}
                        required
                        //            value={values.funnyCounter}
                    />
                    <Input
                        name="bestOf"
                        label="Best Of"
                        type="number"
                        step="1.00"
                        onChange={fieldDidChangeInput}
                        required
                    />
                    <InputRadio
                        id="rated"
                        name="rated"
                        label="Rated"
                        type="checkbox"
                        //                        step="1.00"
                        onChange={fieldDidChangeInput}
                        //                        required
                        //            value={values.funnyCounter}
                    />
                    <Button type="submit">Create Game Session</Button>
                </div>
            </div>
        </form>
    );
};