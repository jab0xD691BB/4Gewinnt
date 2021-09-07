import styled from "styled-components";
import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthenticationContext";

const HelpPageBody = styled.div`
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  width: 30%;
  display: flex;
  flex-direction: column;
  height: 600px;
`;

export const HelpPageHeader = styled.div`
  background-color: ${(props) => props.theme.colors.buttonColor};
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  font-size: 30px;
  margin: 10px;
  `;

export const HelpPageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.buttonColor};
  border-radius: 10px;
  text-align: start;
  padding: 15px;
  font-size: 25px;
  margin: 10px;
  overflow-y: scroll;
  `;

const LeftDiv = styled.div`
  width: 63%;
  display: flex;
  flex-direction: column;
`;

const RightDiv = styled.div`
  height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 30%;
  display: flex;
  flex-direction: column;
`;



export const HelpPage = () => {
    return (
        <Layout>
            <HelpPageBody>
                <HelpPageHeader>
                    Help
                </HelpPageHeader>
                <HelpPageContainer>
                    {textDummy}
                </HelpPageContainer>
            </HelpPageBody>
        </Layout>
    );
};

const textDummy = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   \n" +
    "\n" +
    "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   \n" +
    "\n" +
    "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.   \n" +
    "\n" +
    "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer"