import styled from 'styled-components';
import React from "react";

export const ReplayButtonWrapper = styled.div`
  background-color: #2b2b2b;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  padding: 10px 
`;

export const ArrowLeftButton = styled.div`
  width: 0;
  height: 0;
  
  border-top: 25px solid transparent;
  border-right: 60px solid ${(props) => props.theme.colors.primary};
  border-bottom: 25px solid transparent;
  
  margin-right: 10px;
  
  transition-duration: 250ms;
  outline: 0;
  &:hover,
  &:focus {
    transform: translateY(-2px) translateX(-2px);
;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  `;

export const ArrowRightButton = styled.div`
  width: 0;
  height: 0;
  
  border-top: 25px solid transparent;
  border-left: 60px solid ${(props) => props.theme.colors.primary};
  border-bottom: 25px solid transparent;
  
  margin-left: 10px;
  
  transition-duration: 250ms;
  outline: 0;
  &:hover,
  &:focus {
    transform: translateY(-2px) translateX(-2px);
;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  `;