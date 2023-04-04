// Source: https://www.pluralsight.com/guides/react-inline-styling
// Source: https://www.framer.com/motion/transition/
// Source: https://www.bing.com/videos/riverview/relatedvideo?&q=framer+motion+transition&&mid=E6BC292FE16B5F810F75E6BC292FE16B5F810F75&&FORM=VRDGAR

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
import { Margin } from "../../margin";
import { AccountContext } from "./accountContext";
import { useMutation } from '@apollo/client';
import Auth from '../../../utils/auth';
import { CREATE_USER } from '../../../utils/mutations';
import { Form }  from 'react-bootstrap';

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [validated] = useState(false);
  
  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(userData);

      const form = event.currentTarget;
      if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
      }

      try {
          const { data } = await createUser({
              variables: {...userData},
          });

          Auth.login(data.createUser.token);
      } catch (err) {
          console.error(err);
      }
  }

  return (
    <BoxContainer>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Input 
        name='username'
        type="text" 
        placeholder="Username"
        onChange={handleInputChange} />
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
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
      </Form>
    </BoxContainer>
  );
}
