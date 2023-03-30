import React from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../marginer";
// dont forget to add information on how to retreive lost password

export function SignupForm(props) {
    return (
    <BoxContainer>
        <FormContainer>
            <Input type="text" placeholder="Full Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm Password" />        
        </FormContainer>
        <MutedLink>Forgot your password?</MutedLink>
        <SubmitButton type="submit">Sign In!</SubmitButton>
        <MutedLink>Don't have an account? Sign up here!</MutedLink>
    </BoxContainer>
    );
}