import React, { useState, useEffect } from 'react';
import { Modal, Form, Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { createFavorites } from '../../actions/favorites'
// import { useForm } from 'react-hook-form'

export default function FavoriteItemPage({ isOpen, close, currentId, setCurrentId }) {

    const [favoritesData, setFavoritesData] = useState({
        _id: '',
        title: '',
        owner: '',
    });

    // const favorites = useSelector((state) => (currentId ? state.favorites.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (favorites) setFavoritesData(favorites);
    // }, [favorites]);

    const clear = () => {
        setFavoritesData({
            _id: '',
            title: '',
            owner: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(favoritesData);
        // if (currentId === 0) {
        dispatch(createFavorites(favoritesData));
        clear();
        close();
        // }
    };

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header >
                <Modal.Title>Add Favorites</Modal.Title>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" />
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Type a title for list" value={favoritesData.title}
                            onChange={(e) => setFavoritesData({ ...favoritesData, title: e.target.value })} />
                        {/* <Form.Text>
                            <Alert variant="danger">
                                Are you sure_
                            </Alert>
                        </Form.Text> */}

                        {/* {errors?.password && (
							<Form.Text>
							<Alert variant="danger">
								{errors.password.message}
							</Alert>
						</Form.Text>
							)} */}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Owner</Form.Label>
                        <Form.Control type="text"
                            placeholder="Type Owner"
                            value={favoritesData.owner}
                            onChange={(e) => setFavoritesData({ ...favoritesData, owner: e.target.value })} />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" placeholder="Type ID" value={favoritesData._id}
                            onChange={(e) => setFavoritesData({ ...favoritesData, _id: e.target.value })} />

                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" placeholder="Type a title for list" value={favoritesData.items}
                            onChange={(e) => setFavoritesData({ ...favoritesData, title: e.target.value })} />
                    </Form.Group> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>

    )
}
