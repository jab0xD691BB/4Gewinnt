import React, { useRef, useState, ChangeEvent, useContext} from "react";
import {Input} from "./components/Input";
import { Button } from "./components/Button";
import { Layout } from "../../components/Layout";
import { useTheme } from "./ThemeManager";
import styled, {ThemeProvider} from "styled-components";
import * as themeConf from "../../theme";


export const SettingsPage =()=>{

  const theme = useTheme();

  const Wrapper = styled.div`
    background-color: ${themeConf.backgroundColor};
    color: ${themeConf.textColor};
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
  `;

  const Button = styled.button`
    background: ${themeConf.buttonBackgroundColor};
    border: none;
    border-radius: 0.3em;
    box-shadow: none;
    color: ${themeConf.buttonTextColor};
    cursor: pointer;
    font-size: 1em;
    padding: 0.5em 1em;
  `;

  return (
    <ThemeProvider theme={{ mode: theme.mode }}>
      <Wrapper>
      <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}>
        <Input label="Change Name" name="changename"></Input>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}>
        <Button onClick={() => theme.toggle()}>
            {theme.mode === 'dark' ? "Light Mode" : "Dark Mode"}
          </Button>
      </div>
      </Layout>
      </Wrapper>
    </ThemeProvider>
  );
}