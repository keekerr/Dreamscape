import React, { useState, useEffect } from 'react';
import {
  Col,
  Button,
  Card,
  Modal,
  Row} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_IMAGE } from '../utils/mutations';

function ImageModal({ searchedImages }) {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [addImage] = useMutation(ADD_IMAGE);
  useEffect(() => {
    setShow(true);
  }, []);


  const handleClose = () => setShow(false);
  
  // Adds imageLink to db so it can be rendered as a image on the user's vision board   
  const handleAddImage = async (imageLink) => {
    // This is built this way to check if the user has already saved the image    
    const saveImage = searchedImages.find((image) => image.imageLink === imageLink);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    try {
        await addImage({
          variables: { input: { imageLink: saveImage.imageLink } }
        });
        setImage(saveImage);
    } catch (err) {
        console.error(err);
    }
}

  return (
    <>
        <Modal.Header closeButton>
          <Modal.Title>Search Results: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='img-container'> 
          {/* Replace placeholders with the api res, or dont it could just be a cat website*/} 
          {searchedImages.map((images) => {
            return (
              <Row>
              <Col md="4">
                <Card key={images.description} border='dark'>
                  {images.description ? (
                    <Card.Img src={images.imageLink} alt={`${images.description}`} variant='top' />
                  ) : null}
                      <Button
                        disabled={image?.imageLink === images.imageLink}
                        className='btn btn-dark mx-5 my-2 px-4'
                        onClick={() => handleAddImage(images.imageLink)}>
                        {image?.imageLink === images.imageLink
                          ? 'Image added'
                          : 'Add image to your Vision Board'}
                      </Button>
                </Card>
              </Col>
              </Row>
            );
          })}
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
    </>
  );
}

export default ImageModal;
