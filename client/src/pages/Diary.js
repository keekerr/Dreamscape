import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { REMOVE_ENTRY } from '../utils/mutations';
import Auth from '../utils/auth';
import DiaryEntry from '../components/DiaryEntry';
import { Button, Modal } from 'react-bootstrap';
import AddEntry from '../components/AddEntry';

const DiaryEntries = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!Auth.loggedIn()) {
      window.location.replace('http://localhost:3000/login-signup');
    } 
  }, []);

  const { loading, data } = useQuery(GET_USER);

  // const [editEntry] = useMutation(EDIT_ENTRY);
  const [removeEntry] = useMutation(REMOVE_ENTRY);

    if (loading) {
        return <h2>LOADING...</h2>;
      }

    const userData = data?.user.diaryEntries || [];

    const handleButtonPush = (event) => {
      setShowModal(true)
    }

    const handleRemoveEntry = async (entryID) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
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
        <h1 className='text-center mt-1 mb-3'>Welcome to your Diary</h1>
          <Button 
            onClick={handleButtonPush} 
            className='btn mx-5 mb-5 px-4'
            style={{ color: "white", backgroundColor: "#2eb499", borderColor: "#2eb499"}}
            >Add Entry</Button>
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
      </div>

      
    );

}

export default DiaryEntries;