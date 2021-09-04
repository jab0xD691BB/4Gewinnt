import { createPortal } from 'react-dom';
import disableScroll from 'disable-scroll';
import { useCallback } from "react-use-callback";
import { useState } from 'react';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOverlayClick: React.MouseEventHandler<HTMLDivElement>;
  elementId: 'root' | string;
};

export interface ModalOptions {
  preventScroll?: boolean;
  closeOnOverlayClick?: boolean;
};

const modalStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '180px 200px',
    borderRadius: '50px',
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
  position: 'fixed',
  top: 0,
  left: -400,
  bottom: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100,
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 100000,
};

const containerStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 100001,
};

const Modal: React.FC<ModalProps> = ({ children, isOpen = false, onOverlayClick, elementId = 'root' }) => {
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

export const useModal: UseModal = (elementId = 'root', options = {}) => {
  const { preventScroll = false, closeOnOverlayClick = true } = options;
  const [isOpen, setOpen] = useState<boolean>(false);
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
  const onOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (closeOnOverlayClick) {
      close();
    }    
  }, [closeOnOverlayClick, close]);

  const ModalWrapper = useCallback(
    ({ children }) => {
      return (
        <Modal isOpen={isOpen} onOverlayClick={onOverlayClick} elementId={elementId}>
          {children}
        </Modal>
      );
    },
    [isOpen, close, elementId]
  );

  return [ModalWrapper, open, close, isOpen];
};

export const GameoverPopup = () => {
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false,
      });
      return (
        <div>
        <button onClick={open}>OPEN</button>
        <Modal>
            <div style={modalStyle}>
            <div        
                style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                marginLeft: "180px"
            }}>
                <button onClick={close}>X</button>
            </div>
            <h1>GAME OVER</h1>
            <p>Player1: Felix won </p>
            <p>Player2: Lucca lost</p>
            </div>
        </Modal>
        </div>
      );
};