import React, { ButtonHTMLAttributes, useContext, useState } from "react";
import styled from "styled-components";
import { authContext } from "../../../context/AuthenticationContext";
import { SocketContext } from "../../../context/socket.context";

const ChatWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: #2b2b2b;
  border-radius: 4px;
  height: 45%;
  padding: 10px;
`;

const InputButtonWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 10%;
`;

const ChatButton = styled.button`
  color: green;
  width: 15%;
  height: 80%;
`;

const ChatInput = styled.input`
  width: 80%;
  height: 80%;
`;

const ShowMessage = styled.div`
  width: 100%;
  height: 90%;
`;

const MessagWrapper = styled.div`
  width: 100%;
  height: 20px;
`;

export const Chat = () => {
  const socketContext = useContext(SocketContext);
  const { token } = useContext(authContext);
  const name = JSON.parse(atob(token!.split(".")[1])).name;
  const [message, setMessage] = useState("");

  const sendMessageOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (message != "") {
      socketContext.socket.emit("message", { name, message });
      setMessage("");
    }
  };

  const sendMessageOnEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && message != "") {
      socketContext.socket.emit("message", { name, message });
      setMessage("");
    }
  };

  return (
    <ChatWrapper>
      <ShowMessage>
        {socketContext.messages.map(({ name, message }) => {
          return (
            <MessagWrapper>
              <span
                style={{
                  color:
                    name === "System"
                      ? "grey"
                      : "" || name === name
                      ? socketContext.gameState?.players.get(name)?.color
                      : "",
                }}
              >
                {name}
              </span>
              {": " + message}
            </MessagWrapper>
          );
        })}
      </ShowMessage>
      <InputButtonWrapper onKeyDown={sendMessageOnEnter}>
        <ChatInput
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(e.target.value);
          }}
        ></ChatInput>
        <ChatButton onClick={sendMessageOnClick}>Send</ChatButton>
      </InputButtonWrapper>
    </ChatWrapper>
  );
};
