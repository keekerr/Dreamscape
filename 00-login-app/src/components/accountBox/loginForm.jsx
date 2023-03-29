import React from "react";
import { BoxContainer, FormContainer, Input } from "./common";
import { Marginer } from "../marginer";

// dont forget to add information on how to retreive lost password

export function LoginForm(props) {
    return (
    <BoxContainer>
        <FormContainer>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
        
        </FormContainer>
    </BoxContainer>
    );
}