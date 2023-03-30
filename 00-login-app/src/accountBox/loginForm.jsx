import React from "react";
import { BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../marginer";

// dont forget to add information on how to retreive lost password

export function LoginForm(props) {
    return (
    <BoxContainer>
        <FormContainer>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />       
        </FormContainer>
        <MutedLink>Forgot your password?</MutedLink>
        <SubmitButton type="submit">Sign In!</SubmitButton>
        <MutedLink>Don't have an account? Sign up here!</MutedLink>
    </BoxContainer>
    );
}