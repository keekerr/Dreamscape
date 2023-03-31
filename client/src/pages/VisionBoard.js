import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { ADD_IMAGE, REMOVE_IMAGE } from '../utils/mutations';
import Auth from '../utils/auth';

// will need to edit this when unsplash is implemented
const VisionBoard = () => {
    const [imageData, setImageData] = useState({ imageLink: '' });
    const { data } = useQuery(GET_USER);
    const [addImage] = useMutation(ADD_IMAGE);
    const [removeImage] = useMutation(REMOVE_IMAGE);

    const visionBoardData = data?.user.images;
    console.log(visionBoardData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setImageData({ ...imageData, [name]: value });
    };

    const handleAddImage = async () => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await addImage({
                variables: { input: { ...imageData } }
            });
        } catch (err) {
            console.error(err);
        }
    }

    const handleRemoveImage = async (imageID) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try { 
            await removeImage({
                variables: { imageID }
            });
        } catch (err) {
            console.error(err);
        }
    }
}