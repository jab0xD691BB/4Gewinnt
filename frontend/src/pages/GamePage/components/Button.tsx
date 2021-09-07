import styled from "styled-components";

export const VerticalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flexdirection: row;
  background-color: ${(props) => props.theme.colors.buttonColor};
  border-radius: 10px;
  margin-top: 7%;
  height: 10%;
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.buttonColor};
  border: 0px;
  border-radius: 10px;
  color: black;
  line-height: 22.4px;
  padding: 10.2px 26.4px;
  text-align: center;
  width: 100%;
  font-weight: 500;
  transition-duration: 250ms;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;

  outline: 0;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHoverColor};
  }
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const DisabledButton = styled.button`
  background-color: ${(props) => props.theme.colors.listHoverColor};
  border: 0px;
  border-radius: 10px;
  color: black;
  line-height: 22.4px;
  padding: 13.2px 26.4px;
  text-align: center;
  width: 100%;
  font-weight: 500;
  transition-duration: 250ms;
  margin-bottom: 20px;
  margin-top: 10px;

  outline: 0;

    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const DangerButton = styled(Button)`
  background-color:  ${(props) => props.theme.colors.dangerButton};
  outline: 0;
  &:hover {
    background-color:  #fe0000;
  }
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;
