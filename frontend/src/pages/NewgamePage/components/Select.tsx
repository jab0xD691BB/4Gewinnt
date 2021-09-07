import styled from "styled-components";
// @ts-ignore
const SelectLabel = styled.label`
  position: absolute;
  left: 15px;
  top: 35px;
  color: rgb(116, 116, 116);
  transform: matrix(1, 0, 0, 1, 0, -12.5);
  transition-property: transform;
  line-height: 25px;
  font-size: 18px;
  transition-duration: 0.3s;
`;

const SelectField = styled.select`
  background-color: transparent;
  padding: 35px 21px 13px;
  outline-width: 0px;
  border-width: 0;
  &:focus + ${SelectLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  &:not(:placeholder-shown) + ${SelectLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  height: 100%;
  width: 100%;
`;

const SelectOption = styled.option`
  background-color: transparent;
  padding: 35px 21px 13px;
  outline-width: 0px;
  border-width: 0;

  height: 100%;
  width: 100%;
`;

const SelectContainer = styled.div`
  transition-duration: 0.4s;
  transition-property: box-shadow, border-color;
  border: 1px solid rgb(230, 230, 230);

  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  color: #000;
  position: relative;
  height: 72px;
  margin-bottom: 16px;

  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.primary};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 2px ${(props) => props.theme.colors.primary};
  }
`;
