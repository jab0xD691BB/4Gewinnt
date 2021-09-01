import React from "react";
import styled, { css } from "styled-components/macro";
import { Logo } from "./Logo";


export const Layout:React.FC = ({children})=>{

    const headerHeight="85px";
    const footerHeight="50px";

    const MaxWidthCSS = css`
        max-width: 860px;
        margin:auto;
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
        ${MaxWidthCSS};
    `; 

    const Footer = styled.footer`
        height:${footerHeight};
        ${MaxWidthCSS};
    `; 

    const NavigationList = styled.ul`
    list-style: none;
    `;

    const NavigationItem = styled.li`
    color: ${props => props.theme.colors.primary};
    `;


    return (
        <>
            <Header>
                <Logo/>
            <NavigationList>
                <NavigationItem>HOME</NavigationItem> 
            </NavigationList>
        </Header>
        <Main>{children}</Main>
        <Footer>
        &copy;2021 AWD
        </Footer>
        </>
    );
}