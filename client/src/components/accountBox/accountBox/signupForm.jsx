import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useMutation } from '@apollo/client';
import Auth from '../../../utils/auth';
import { CREATE_USER } from '../../../utils/mutations';

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
      <FormContainer onSubmit={handleFormSubmit}>
        <Input 
        type="text" 
        placeholder="Username"
        onChange={handleInputChange} />
        <Input 
        type="email" 
        placeholder="Email"
        onChange={handleInputChange} />
        <Input 
        type="password" 
        placeholder="Password"
        onChange={handleInputChange} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
