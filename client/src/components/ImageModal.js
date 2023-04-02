import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ImageModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='custom-btn' size='lg' onClick={handleShow}>
        Search
      </Button>

      <Modal show={show} onHide={handleClose} animation={true} >
        <Modal.Header closeButton>
          <Modal.Title>Search Results: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='img-container'> 
          {/* Replace placeholders with the api res, or dont it could just be a cat website*/} 
              <img src='http://placekitten.com/600' className='img-item' />
              <img src='http://placekitten.com/600' className='img-item' />
              <img src='http://placekitten.com/600' className='img-item' />
              <img src='http://placekitten.com/600' className='img-item' />
              <img src='http://placekitten.com/600' className='img-item' />
              <img src='http://placekitten.com/600' className='img-item' />
              <img src='http://placekitten.com/600' className='img-item' />
              <img src='http://placekitten.com/600' className='img-item' />
              <img src='http://placekitten.com/600' className='img-item' />
              <img src='http://placekitten.com/600' className='img-item' />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button className='custom-btn' variant='primary' onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageModal;
