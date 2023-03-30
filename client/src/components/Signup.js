import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { CREATE_USER } from '../utils/mutations';

const Signup = () => {
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

}