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
    return (
        <div>
          <h1 className='text-center m-5'>Welcome to your Diary</h1>
          <form>
            <div className='mx-5'>
              <label form='exampleInputEmail1' className='form-label'>
              </label>
              <input
                type='text'
                className='form-control'
                id='diary-title'
                placeholder='Enter title for Diary entry here...'
              />
              <div id='emailHelp' className='form-text'>
              </div>
            </div>
            <div className='mx-5'>
              <label form='exampleFormControlTextarea1' className='form-label'>
              </label>
              <textarea
                className='form-control'
                id='diary-text'
                rows='3'
                placeholder='Enter text for Diary entry here...'
              ></textarea>
            </div>
            <button type='submit' className='btn btn-dark mx-5 my-2 px-4'>
              Submit
            </button>
          </form>
        </div>
      );
  
  }
  
  export default VisionBoard;
