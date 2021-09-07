import React, {useContext} from "react";
import styled, {css} from "styled-components/macro";
import {Connect4Img} from "../img/Connect4";
import {Link, NavLink, Route, Switch} from "react-router-dom";
import {authContext} from "../context/AuthenticationContext";
import {Button, ActiveButton, DangerButton} from "./Button";

export const headerHeight = "85px";
export const footerHeight = "50px";

const MaxWidth = css`
    margin-right: 200px;
    margin-left: 100px;
`;

const Main = styled.main`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  ${MaxWidth}
`;

const Footer = styled.footer`
  height: ${footerHeight};
  ${MaxWidth}
`;

const NavigationList = styled.div`  
  margin-right: 30px;
  
`;

const NaviSectionWrapper = styled.div`

  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-bottom: 10px;
  padding: 10px;
  
`

const NavigationItem = styled.div`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
`;

const LogoTitel = styled.div`
  position: relative;
  padding: 10px
`;

const Titel = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.7rem;
  text-shadow: 0 0 4px #ffffff;
`;

export const Layout: React.FC = ({children}) => {


    const {
        actions: {logout},
    } = useContext(authContext);
    return (
        <>
            <Main>
                <NavigationList>
                    <NaviSectionWrapper>
                        <LogoTitel>
                            <Connect4Img/>
                            <Titel>
                                Connect
                                <span
                                    css={`color: red; text-shadow: 0 0 4px #ffffff;`}>4
                            </span>
                            </Titel>
                        </LogoTitel>
                    </NaviSectionWrapper>
                    <NaviSectionWrapper>
                        <NavigationItem>
                            <Link to="/dashboard" style={{textDecoration: "none"}}>
                                <Button>
                                    Dashboard
                                </Button>
                            </Link>
                        </NavigationItem>
                        <NavigationItem>
                            <Link to="/newgame" style={{textDecoration: "none"}}>
                                <Button>
                                    New Game
                                </Button>
                            </Link>
                        </NavigationItem>
                        <NavigationItem>
                            <Link to="/settings" style={{textDecoration: "none"}}>
                                <Button>
                                    Settings
                                </Button>
                            </Link>
                        </NavigationItem>
                        <NavigationItem>
                            <Link to="/help" style={{textDecoration: "none"}}>
                                <Button>
                                    Help
                                </Button>
                            </Link>
                        </NavigationItem>
                        <NavigationItem>
                            <DangerButton
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Logout
                            </DangerButton>
                        </NavigationItem>
                    </NaviSectionWrapper>
                </NavigationList>
                {children}
            </Main>
            <Footer>&copy; Connect4 2021</Footer>
        </>
    );
};
