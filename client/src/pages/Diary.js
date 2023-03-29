import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { ADD_ENTRY, EDIT_ENTRY, REMOVE_ENTRY } from '../utils/mutations';
import Auth from '../utils/auth';

const DiaryEntries = () => {
    const [formData, setFormData] = useState({ title: '', entry: '' });
    const { data } = useQuery(GET_USER);
    const [addEntry] = useMutation(ADD_ENTRY);
    const [editEntry] = useMutation(EDIT_ENTRY);
    const [removeEntry] = useMutation(REMOVE_ENTRY);

    const userDiaryData = data?.user.diaryEntries;
    console.log(userDiaryData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddEntry = async () => {
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
    const handleEditEntry = async () => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await editEntry({
                variables: { input: { ...formData } }
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveEntry = async (entryID) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await removeEntry({
                variables: { entryID }
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
      <div>
        <h1 class='text-center m-5'>Welcome your Diary</h1>
        <form>
          <div class='mx-5'>
            <label for='exampleInputEmail1' class='form-label'>
            </label>
            <input
              type='text'
              class='form-control'
              id='diary-title'
              placeholder='Enter title for Diary entry here...'
            />
            <div id='emailHelp' class='form-text'>
            </div>
          </div>
          <div class='mx-5'>
            <label for='exampleFormControlTextarea1' class='form-label'>
            </label>
            <textarea
              class='form-control'
              id='diary-text'
              rows='3'
              placeholder='Enter text for Diary entry here...'
            ></textarea>
          </div>
          <button type='submit' class='btn btn-dark mx-5 my-2 px-4'>
            Submit
          </button>
        </form>
      </div>
    );

}

export default DiaryEntries;
