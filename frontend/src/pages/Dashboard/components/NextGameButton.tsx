import styled from "styled-components";
import React from "react";

const NextGameButtonLayout = styled.div`
  height: 20%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NextGameButtonButton = styled.button`
  background-color: green;
  color: black;
  border: 0px;
  border-radius: 10px;
  transition-duration: 250ms;
  line-height: 50px;
  font-size: 20px;
  width: 40%;
  &:hover {
    background-color: #50e150;
  }
`;

export const NextGameButton = () => {
  return (
    <NextGameButtonLayout>
      <NextGameButtonButton>Next Game</NextGameButtonButton>
    </NextGameButtonLayout>
  );
};
