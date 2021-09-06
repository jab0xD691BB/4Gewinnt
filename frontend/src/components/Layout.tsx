import React, {useContext} from "react";
import styled, { css } from "styled-components/macro";
import { Connect4Img } from "../img/Connect4";
import { Logo } from "./Logo";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { authContext } from "../context/AuthenticationContext";



const TextButton = styled.button`
  all: unset;
  color: ${(props) => props.theme.colors.primary};
  pointer: click;
  `;

export const headerHeight = "85px";
export const footerHeight = "50px";

const MaxWidth = css`
  max-width: 1300px;
  margin: auto;
`;

const Header = styled.header`
  height: ${headerHeight};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 25px;
`;

const Main = styled.main`
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  ${MaxWidth}
`;

const Footer = styled.footer`
  height: ${footerHeight};
  ${MaxWidth}
`;

const NavigationList = styled.div`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
const NavigationItem = styled.div`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  margin-right: 15px;
`;

const LogoTitel = styled.div`
  position: relative;
`;

const Titel = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.7rem;
  text-shadow: 0 0 4px #ffffff;
`;


export const Layout: React.FC = ({ children }) => {

const {
  actions: { logout },
} = useContext(authContext);    
  return (
    <>
      <Header>
        <LogoTitel>
          <Connect4Img />
          <Titel>
            Connect
            <span
              css={`
                color: red;
                text-shadow: 0 0 4px #ffffff;
              `}
            >
              4
            </span>
          </Titel>
        </LogoTitel>
        <NavigationList>
        <NavigationItem> 
            <BrowserRouter>
              <NavLink to="/settings">Settings
              <Switch>
                <Route exact path="/settings">
                </Route>
              </Switch>
              </NavLink>
            </BrowserRouter>
          </NavigationItem>
          <NavigationItem>
             <TextButton
            onClick={() => {
              logout();
            }}
          >
            Logout
            </TextButton>
            </NavigationItem>
          <NavigationItem> Help</NavigationItem>
        </NavigationList>
      </Header>
      <Main>{children}</Main>
      <Footer>Footer</Footer>
    </>
  );
};
