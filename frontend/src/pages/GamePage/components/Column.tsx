import styled from "styled-components";

export const FieldColumn = styled.div`
    background: ${(props) => props.theme.colors.fullyTransparentColor};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 2px solid ${(props) => props.theme.colors.fullyTransparentColor};

    outline: 0;
    &:hover {
        border: 2px solid ${(props) => props.theme.colors.primary};
    }
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
`;