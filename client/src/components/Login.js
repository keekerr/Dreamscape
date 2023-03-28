//loginUser

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
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
}