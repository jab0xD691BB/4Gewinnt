import React, { useRef, useState, ChangeEvent, useContext } from "react";
import { Input } from "./components/input";
import { Layout } from "../../components/Layout";
import styled, {
  ThemeContext,
} from "styled-components";
import { authContext } from "../../context/AuthenticationContext";
import Settings from "../../components/Header";
import { Container } from "../../components/Header/styles";
import { ChangeNameButton } from "./components/Button";

interface props {
  providerSetTheme: (t: string) => void;
}

export const SettingsPage: React.FC<props> = ({ providerSetTheme }) => {
  const { token } = useContext(authContext);
  const [newName, setnewName] = useState(null);
  const themeTitel = useContext(ThemeContext);

  const getTokenData = () => {
    if (token) {
      const playerid = JSON.parse(atob(token.split(".")[1])).id;
      console.log(playerid);
      return playerid;
    }
    return null;
  };
  const getnewName = async function (val: any) {
    setnewName(val.target.value);
  };

  const updateName = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = getTokenData();
    await fetch(`/api/player/${id}`, {
      body: `{"name": "${newName}"}`,
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });
    console.log("new name is ", newName);
    alert("Your name has been successfully updated");
  };

  const toggleTheme = () => {
    providerSetTheme(themeTitel.title);
  };

  return (
    <Layout>
      <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Input
          label="Change Name"
          name="changename"
          type="changename"
          onChange={getnewName}
        ></Input>
        <br></br>
      </div>
      <ChangeNameButton onClick={updateName}>Submit</ChangeNameButton>
      </Container>
      <div>
        <Settings toggleTheme={toggleTheme} />
      </div>
    </Layout>
  );
};
