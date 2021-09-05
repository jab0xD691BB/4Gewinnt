import styled, {keyframes} from 'styled-components';
import React from "react";

export const GameHeaderWrapper = styled.div`
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

export const PlayerNameWrapperActive = styled.div`
  border-radius: 10px;
  position: relative;
  text-align: center;
  height: 100%;
  padding: 15px;
  font-size: 25px;
  margin-left: 10px;
  margin-right: 10px;
 
  animation: blinker 1.5s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}  
  
}



  `;

export const PlayerNameWrapperInactive = styled.div`
  background-color: #4b4b4b;
  border-radius: 10px;
  position: relative;
  text-align: center;
  height: 100%;
  padding: 15px;
  font-size: 25px;
  margin-left: 10px;
  margin-right: 10px;
  `;
/*
@keyframes blink {
  0% { color: red; }
  100% { color: black; }
}
@-webkit-keyframes blink {
  0% { color: red; }
  100% { color: black; }
}
.blink {
  -webkit-animation: blink 1s linear infinite;
  -moz-animation: blink 1s linear infinite;
  animation: blink 1s linear infinite;
}


  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;

@keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
@-webkit-keyframes blink-animation {
  to {
    visibility: hidden;
  }
}

 */