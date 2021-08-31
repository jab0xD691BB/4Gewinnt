import React from "react";
import styled, { css } from "styled-components/macro";

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

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <div>
          <span>Connect4</span>
        </div>
        <NavigationList>
          <NavigationItem>Settings</NavigationItem>
          <NavigationItem>Logout</NavigationItem>
          <NavigationItem>Help</NavigationItem>
        </NavigationList>
      </Header>
      <Main>{children}</Main>
      <Footer>Footer</Footer>
    </>
  );
};
