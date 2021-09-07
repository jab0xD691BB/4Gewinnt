import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
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
    background-color: #50e150;
  }
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const ActiveButton = styled.button`
  background-color: ${(props) => props.theme.colors.listHoverColor};
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
    background-color: #50e150;
  }
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;