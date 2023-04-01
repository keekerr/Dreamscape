import React from 'react';
import { useState, useContext } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../../marginer";
import { AccountContext } from "./accountContext";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../utils/mutations';
import Auth from '../../../utils/auth';
import { Form }  from 'react-bootstrap';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [validated] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: { ...userData }
      });

      console.log(data);
      Auth.login(data.loginUser.token);
      } catch (err) {
        console.error(err);
      }

    setUserData({
        email: '',
        password: '',
    });
  }

  return (
    <BoxContainer>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      {/* <FormContainer  */}
        {/* // noValidate 
        // validated={validated} 
        // onSubmit={handleFormSubmit}> */}
        <Input 
          name='email'
          type="email" 
          placeholder="Email"
          onChange={handleInputChange} />
        <Input 
          name='password'
          type="password" 
          placeholder="Password"
          onChange={handleInputChange} />
      {/* </FormContainer> */}
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton 
        type="submit"
        >Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
      </Form>
    </BoxContainer>
  );
}
