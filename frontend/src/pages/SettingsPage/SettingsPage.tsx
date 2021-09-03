import React, { useRef, useState, ChangeEvent, useContext} from "react";
import { Input } from "./components/input";
import { Layout } from "../../components/Layout";
import styled, {ThemeProvider} from "styled-components";
import * as themeConf from "../../theme";
import { authContext } from "../../context/AuthenticationContext";


export const SettingsPage =()=>{

  const {token} = useContext(authContext);
  const [newName, setnewName] = useState(null);
  const getTokenData = () => {
    if (token) {
      const playerid = JSON.parse(atob(token.split(".")[1])).id;
      console.log(playerid);
      return playerid;
    }
    return null;
  };
  const getnewName = async function(val: any){
    setnewName(val.target.value);
  }

  const updateName = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const id = getTokenData();
      await fetch(`/api/player/${id}`,{
        body:  `{"name": "${newName}"}`,
        headers: {'Content-Type': 'application/json'}, method: 'PUT' 
    });
    console.log("new name is ",newName);
    alert("Your name has been successfully updated")
  };
  
  
  const Button1 = styled.button`
        background-color: ${(props) => props.theme.colors.primary};
        border: 0px;
        border-radius: 10px;
        color: black;
        line-height: 22.4px;
        padding: 13.2px 26.4px;
        text-align: center;
        width: 16%;
        font-weight: 500;
        transition-duration: 250ms;
        margin-bottom: 10px;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;

        outline: 0;
        &:hover {
            background-color: #50e150;
        }
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }
  `;

  return (
      
      <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}>
        <Input label="Change Name" name="changename" type ="changename" onChange={getnewName}></Input>
        <br></br>
        
      </div>
      <Button1 onClick={updateName}>Change Name</Button1>
      </Layout>
     
    
  );
}
