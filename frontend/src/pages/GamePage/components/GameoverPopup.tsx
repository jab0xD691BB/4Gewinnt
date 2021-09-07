import { useContext} from "react";
import { Button } from "../../../components/Button";
import {useModal, modalStyle} from "./ReadyCheck"

import { SocketContext } from "../../../context/socket.context";

export const GameoverPopup = () => {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const socketContext = useContext(SocketContext);

  return (
    <div>
      <Modal>
        <div style={modalStyle}>
          <h1>GAME OVER</h1>
          <p>Player1: {socketContext.gameState?.winner} won </p>
          <p>
            Player2:{" "}
            {socketContext.gameState?.winner ===
            socketContext.joinedRoom?.player1.name
              ? socketContext.joinedRoom?.player2.name
              : socketContext.joinedRoom?.player1.name}{" "}
            lost
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Button onClick={close}>X</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
