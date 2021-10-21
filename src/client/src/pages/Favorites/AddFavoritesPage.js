import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { createFavorites } from '../../actions/favorites';

export default function AddFavoritesPage({ isOpen, close, currentId, setCurrentId }) {

    const [favoritesData, setFavoritesData] = useState({
        _id: uuid(),
        title: '',
        owner: '',
        items: []
    });

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (favorites) setFavoritesData(favorites);
    // }, [favorites]);

    const clear = () => {
        setFavoritesData({
            _id: '',
            title: '',
            owner: '',
            items: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("favoritesData: ", favoritesData);

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
                    </Form.Group>
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