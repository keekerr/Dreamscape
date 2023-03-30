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
    transition: all 200ms ease-in-out;

    &:placeholder {
        color: yellowgreen
    }

    &:not(:last-of-type) {
        border-bottom: 1.5px solid rgba(200, 200, 200, 0.0.3);
    }

    &:focus{
        outline: none;
        border-bottom: 1.5px solid rgba(200, 200, 200, 0.0.3);
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 11px 40%;
    color: white;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: gray;

    &:hover {
        filter: brightness(1.03)
    }
`;