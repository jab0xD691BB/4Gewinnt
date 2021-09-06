import { createPortal } from "react-dom";
import disableScroll from "disable-scroll";
import { useCallback } from "react-use-callback";
import { useContext, useState } from "react";
import { Button } from "./Button";

import { SocketContext } from "../../../context/socket.context";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOverlayClick: React.MouseEventHandler<HTMLDivElement>;
  elementId: "root" | string;
}

export interface ModalOptions {
  preventScroll?: boolean;
  closeOnOverlayClick?: boolean;
}

const modalStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "180px 200px",
  borderRadius: "50px",
};

export type UseModal = (
  elementId: string,
  options?: ModalOptions
) => [
  ModalWrapper: React.FC<{ children: React.ReactNode }>,
  open: () => void,
  close: () => void,
  isOpen: boolean
];

const wrapperStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: -400,
  bottom: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 100,
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 100000,
};

const containerStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 100001,
};

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen = true,
  onOverlayClick,
  elementId = "root",
}) => {
  if (isOpen === false) {
    return null;
  }
  return createPortal(
    <div style={wrapperStyle}>
      <div style={overlayStyle} onClick={onOverlayClick} />
      <div style={containerStyle}>{children}</div>
    </div>,
    document.getElementById(elementId) as HTMLElement
  );
};

export const useModal: UseModal = (elementId = "root", options = {}) => {
  const { preventScroll = false, closeOnOverlayClick = true } = options;
  const [isOpen, setOpen] = useState<boolean>(true);
  const open = useCallback(() => {
    setOpen(true);
    if (preventScroll) {
      disableScroll.on();
    }
  }, [setOpen, preventScroll]);
  const close = useCallback(() => {
    setOpen(false);
    if (preventScroll) {
      disableScroll.off();
    }
  }, [setOpen, preventScroll]);
  const onOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (closeOnOverlayClick) {
        close();
      }
    },
    [closeOnOverlayClick, close]
  );

  const ModalWrapper = useCallback(
    ({ children }) => {
      return (
        <Modal
          isOpen={isOpen}
          onOverlayClick={onOverlayClick}
          elementId={elementId}
        >
          {children}
        </Modal>
      );
    },
    [isOpen, close, elementId]
  );

  return [ModalWrapper, open, close, isOpen];
};

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
            socketContext.joinedRoom?.player1
              ? socketContext.joinedRoom?.player2
              : socketContext.joinedRoom?.player1}{" "}
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
