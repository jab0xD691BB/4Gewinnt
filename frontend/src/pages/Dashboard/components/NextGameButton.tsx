import styled from "styled-components";
import React from "react";
import {Link} from "react-router-dom";

const NextGameButtonLayout = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NextGameButtonButton = styled.button`
  background-color: ${(props) => props.theme.colors.mainButtonColor};
  color: ${(props) => props.theme.colors.text};
  border: 0px;
  border-radius: 10px;
  transition-duration: 250ms;
  line-height: 50px;
  font-size: 20px;
  width: 40%;
  &:hover {
    background-color: ${(props) => props.theme.colors.mainButtonHoverColor};
  }
`;

export const NextGameButton = () => {
    return (
        <Link to='/newgame'  style={{textDecoration: "none"}}>
            <NextGameButtonLayout>
                <NextGameButtonButton>Next
                    Game</NextGameButtonButton>
            </NextGameButtonLayout>
        </Link>

    );
};
