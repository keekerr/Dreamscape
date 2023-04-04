import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal
} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_ENTRY } from '../utils/mutations';

function AddEntry() {
    const [formData, setFormData] = useState({ title: '', entry: '' });
    const [show, setShow] = useState(false);

    const [addEntry] = useMutation(ADD_ENTRY, {
        onCompleted: () => {
          setFormData({ title: '', entry: '' });
        },
      });

      useEffect(() => {
        setShow(true)
      }, []);

      const handleClose = () => setShow(false);

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
        if (!formData.title || !formData.entry) {
          return false;
        }
        try {
            await addEntry({
                variables: { input: { ...formData } }
            });
        } catch (err) {
            console.error(err);
        }
        setShow(false);
    }

    return (
        <>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "white" }}>Add an Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button 
            type='submit' 
            className='btn mx-5 my-2 px-4' 
            style={{ color: "white", backgroundColor: "#2eb499", borderColor: "#2eb499"}}
            onClick={handleClose}>
            Submit
          </Button>
        </form>
        </Modal.Body>
        </>
    )
}

export default AddEntry;