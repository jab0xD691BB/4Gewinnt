import styled from 'styled-components';
import React from "react";

export const ReplayButtonWrapper = styled.div`
  background-color: #2b2b2b;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 75px;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ReplayButtonWrapperSingle = styled.div`
  background-color: #4b4b4b;
  border-radius: 10px;
  position: relative;
  padding: 8px;
  
  margin-left: 10px;
  margin-right: 10px;

  transition-duration: 250ms;
  outline: 0;
  &:hover {
    background-color: #6b6b6b;
  }
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  
`;

export const ArrowLeftButton = styled.div`
  width: 0;
  height: 0;
  
  border-top: 20px solid transparent;
  border-right: 60px solid green;
  border-bottom: 20px solid transparent;
  
  margin-right: 15px;
  margin-left: 10px;

  outline: 0;

  `;

export const ArrowRightButton = styled.div`
  width: 0;
  height: 0;
  
  border-top: 20px solid transparent;
  border-left: 60px solid green;
  border-bottom: 20px solid transparent;
  
  margin-right: 10px;
  margin-left: 15px;
    
  outline: 0;

  `;