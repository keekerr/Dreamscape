import styled from "styled-components";

export const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;    
`;

export const FormContainer = styled.form`
    width: 100;
    display: flex;
    flex-direction: column;
`;

export const MutedLink = styled.a`
    font-size: 12px;
    color: gray;
    font-weight: 500;
`;

export const BoldLink = styled.a`
    font-size: 12px;
    color: #de2727;
    font-weight: 500;
`;

export const Input = styled.input`
    Width: 100%;
    height: 42px;
    outline: none;
    border: 1px solid rgba(200, 200, 200, 0.0.3);
    padding: 0px 10px;
    &:focus {
        outline: none;
    }
`;