import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { ADD_ENTRY, EDIT_ENTRY, REMOVE_ENTRY } from '../utils/mutations';
import Auth from '../utils/auth';
import DiaryEntry from '../components/DiaryEntry';
import { Button, Modal } from 'react-bootstrap';
import AddEntry from '../components/AddEntry';

const DiaryEntries = () => {
    const { loading, data } = useQuery(GET_USER);

    // const [editEntry] = useMutation(EDIT_ENTRY);
    const [removeEntry] = useMutation(REMOVE_ENTRY);

    const [showModal, setShowModal] = useState(false);

    if (loading) {
        return <h2>LOADING...</h2>;
      }

    const userData = data?.user.diaryEntries || [];

    const handleButtonPush = (event) => {
      setShowModal(true)
    }

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
        <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
          <AddEntry />
        </Modal>
        <div>
        {userData.map((entry) => (
        <DiaryEntry
            key={entry._id}
            entry={entry}
            handleRemoveEntry={handleRemoveEntry}
        />
        ))}
        </div>
        <Button 
          onClick={handleButtonPush} 
          className='btn mx-5 my-2 px-4'
          style={{ color: "white", backgroundColor: "#97afff"}}
          >Add Entry</Button>
      </div>

      
    );

}

export default DiaryEntries;
