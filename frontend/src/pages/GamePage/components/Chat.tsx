import styled from "styled-components";

const ChatWrapper = styled.div`
  height: 310px;
  width: 100%;
  position: relative;
  background-color: #2b2b2b;
  border-radius: 4px;
`;

const InputButtonWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

const ChatButton = styled.button`
  color: green;
  width: 20%;
`;

const ChatInput = styled.input`
  width: 80%;
`;

export const Chat = () => {
  return (
    <ChatWrapper>
      <InputButtonWrapper>
        <ChatInput></ChatInput>
        <ChatButton>test</ChatButton>
      </InputButtonWrapper>
    </ChatWrapper>
  );
};
