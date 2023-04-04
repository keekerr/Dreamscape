import React, { useState, useCallback, useEffect } from 'react';
import update from 'immutability-helper';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { REMOVE_IMAGE } from '../utils/mutations';
import Auth from '../utils/auth';
import { DndProvider, useDrag, useDrop, Draggable } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  Modal,
} from 'react-bootstrap';
import { searchImages } from '../utils/API'

import MyImageModal from '../components/ImageModal';

const Image = ({ image, id, index, moveImage }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'image', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { index: droppedIndex } = dropResult || {};
      const { index: draggedIndex } = monitor.getItem();
      if (droppedIndex !== undefined && draggedIndex !== undefined && droppedIndex !== draggedIndex) {
        moveImage(draggedIndex, droppedIndex);
      }
    },
  });

  return (
    <div key={id} ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {image.imageLink && <img src={image.imageLink} alt={image.description} />}
    </div>
  );
};

const DropZone = ({ searchedImages, setVisionBoardData, visionBoardData }) => {
  const [, drop] = useDrop({
    accept: 'image',
    drop: (item, monitor) => {
      const droppedImage = searchedImages[item.index];
      if (!droppedImage) {
        return;
      }
      const updatedData = [...visionBoardData, droppedImage];
      setVisionBoardData(updatedData);
    },
  });

  return <div ref={drop} style={{ height: '100%' }} />;
};

const ImageModal = ({ searchedImages }) => {
  return (
    <div>
      {searchedImages.map((image, index) => (
        <Image key={index} id={image.id} image={image} index={index} />
      ))}
    </div>
  );
};


const VisionBoard = () => {
  const { data } = useQuery(GET_USER);
  const [searchInput, setSearchInput] = useState('');
  const [searchedImages, setSearchedImages] = useState([]);
  const [removeImage] = useMutation(REMOVE_IMAGE);
  const [showModal, setShowModal] = useState(false);
  const visionBoardData = data?.user || {};

  useEffect(() => {
    if (!Auth.loggedIn()) {
      window.location.replace('/login-signup');
    }
  }, []);

  // handleFormSubmit queries Unsplash API using the searchInput state, and returns the images in the ImageModal
  // It also clears the searchInput state, and takes the data returned from searchImages and passes it into setSearchedImages    
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchImages(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { photos } = await response.json();

      const imageData = photos.results.map((images) => ({
        description: images.alt_description,
        imageLink: images.urls.regular,
      }));

      setSearchedImages(imageData);
      setSearchInput('');
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Grabs the imageID from the selected image and removes it from the database, in turn removing it from page.
  const handleRemoveImage = async (imageID) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeImage({
        variables: { imageID },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const moveImage = useCallback(
    (dragIndex, hoverIndex) => {
      const dragImage = visionBoardData.images[dragIndex];
      setVisionBoardData(
        update(visionBoardData, {
          images: {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragImage],
            ],
          },
        })
      );
    },
    [visionBoardData]
  );
  
  return (
    <DndProvider backend={HTML5Backend}>
      <DropZone />
      <div>
        <Container className='d-flex justify-content-center'>
          <Form onSubmit={handleFormSubmit} className='mb-5'>
            <Row>
              <Col xs={12} md={11}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for an Image'
                  className='mb-3'
                />
              </Col>
              <Col xs={12} md={1}>
                <Button
                  type='submit'
                  variant='success'
                  size='lg'
                  className='btn px-4 custom-btn'
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <MyImageModal searchedImages={searchedImages} />
        </Modal>
      </div>
      <Container className='mt-5 '>
        <Row>
          {visionBoardData.images &&
            visionBoardData.images.map((images) => {
              return (
                <Col md='4'>
                  <Card
                    key={images.imageLink}
                    border='dark'
                    className='grabbable'
                    style={{ marginBottom: "10px" }}
                  >
                    {images.imageLink ? (
                      <Card.Img
                        src={images.imageLink}
                        alt={`${images.description}`}
                        variant='top'
                      />
                    ) : null}
                    <div
                      className='btn-remove-image'
                      onClick={() => handleRemoveImage(images.imageID)}
                    >
                      <i className='bi bi-trash'></i>
                    </div>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </DndProvider>
  );
};

export default VisionBoard;
