import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { ADD_ENTRY, EDIT_ENTRY, REMOVE_ENTRY } from '../utils/mutations';
import Auth from '../utils/auth';
import DiaryEntry from '../components/DiaryEntry';

// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

const DiaryEntries = () => {
    const [formData, setFormData] = useState({ title: '', entry: '' });
    const { loading, data } = useQuery(GET_USER);
    const [addEntry] = useMutation(ADD_ENTRY, {
        onCompleted: () => {
          setFormData({ title: '', entry: '' });
        },
      });
    // const [editEntry] = useMutation(EDIT_ENTRY);
    const [removeEntry] = useMutation(REMOVE_ENTRY);

    if (loading) {
        return <h2>LOADING...</h2>;
      }

    const userData = data?.user.diaryEntries || [];


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleAddEntry = async (event) => {
        event.preventDefault();
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            await addEntry({
                variables: { input: { ...formData } }
            });
        } catch (err) {
            console.error(err);
        }
    }

    // not confident in this...
    // Commenting this out since we probably won't have time to implement it
    // const handleEditEntry = async () => {
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //         return false;
    //     }

    //     try {
    //         await editEntry({
    //             variables: { input: { ...formData } }
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const handleRemoveEntry = async (entryID) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log(entryID)
        if (!token) {
            return false;
        }
        
        try {
            await removeEntry({
                variables: { entryID },
                headers: {
                    authorization: `Bearer ${token}`,
                  },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
      <div>
        <h1 className='text-center m-5'>Welcome to your Diary</h1>
        <form 
            onSubmit={handleAddEntry}>
          <div className='mx-5'>
            <label form='exampleInputEmail1' className='form-label'>
            </label>
            <input
              name='title'
              type='text'
              className='form-control'
              id='diary-title'
              placeholder='Enter title for Diary entry here...'
              value={formData.title}
              onChange={handleInputChange}
            />
            {/* <div id='emailHelp' className='form-text'>
            </div> */}
          </div>
          <div className='mx-5'>
            <label form='exampleFormControlTextarea1' className='form-label'>
            </label>
            <textarea
              name='entry'
              className='form-control'
              id='diary-text'
              rows='3'
              placeholder='Enter text for Diary entry here...'
              value={formData.entry}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button type='submit' className='btn btn-dark mx-5 my-2 px-4'>
            Submit
          </button>
        </form>
        <div>
        <h1>My Diary Page</h1>
        {userData.map((entry) => (
        <DiaryEntry
            key={entry._id}
            entry={entry}
            handleRemoveEntry={handleRemoveEntry}
        />
        ))}
        </div>
      </div>

      
    );

}

export default DiaryEntries;
