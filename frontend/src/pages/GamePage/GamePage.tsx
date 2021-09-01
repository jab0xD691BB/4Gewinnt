import styled from "styled-components";
import {footerHeight, headerHeight, Layout} from "../../components/Layout";
import React, {ChangeEvent, useContext, useState} from "react";

const GameBody = styled.div`
  border: 1px solid white;
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;

export const GamePage = () => {
    return (
        <Layout>
            <GameBody>
                <div
                    style={{display: "flex", flexDirection: "row", width: "100%", height: "800px"}}>
                    <div style={{backgroundColor: "rgb(255,0,0)", width: "70%", height: "100%",}}>
                        <div style={{
                            backgroundColor: "rgb(255,0,0)",
                            width: "100%",
                            height: "75px"
                        }}>
                        </div>
                        <div style={{
                            backgroundColor: "rgb(160,0,0)",
                            width: "100%",
                            height: "650px"
                        }}>
                        </div>
                        <div
                            style={{backgroundColor: "rgb(80,0,0)", width: "100%", height: "75px"}}>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div style={{backgroundColor: "rgb(0,255,0)", width: "30%", height: "100%",}}>
                        <div style={{
                            backgroundColor: "rgb(0,255,0)",
                            width: "100%",
                            height: "300px"
                        }}>
                        </div>
                        <div style={{
                            backgroundColor: "rgb(0,160,0)",
                            width: "100%",
                            height: "500px"
                        }}>
                        </div>
                    </div>
                </div>
            </GameBody>
        </Layout>
    );
};
