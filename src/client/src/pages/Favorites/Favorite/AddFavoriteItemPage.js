import React, { useState, useEffect } from 'react';
import { Modal, Form, Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorites } from '../../../actions/favorites';
import uuid from 'react-uuid';

// import { useForm } from 'react-hook-form'

export default function AddFavoriteItemPage({ isOpen, close, favorite }) {

    const [favoriteListData, setFavoriteListData] = useState(favorite);
    var newItem = "";
    let favoriteItems = (favorite ? favorite.items : []);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        favoriteItems.push({
            id: uuid(),
            name: newItem
        });

        let updatedfavoriteData = {
            ...favoriteListData
        };

        updatedfavoriteData.items = favoriteItems;
        setFavoriteListData(updatedfavoriteData);

        dispatch(updateFavorites(favoriteListData._id, updatedfavoriteData));
        close();
    };

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header >
                <Modal.Title>Add Item to {favoriteListData.title} List</Modal.Title>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" />
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Group>
                        <Form.Label>Item</Form.Label>
                        <Form.Control type="text" placeholder="Enter item" onChange={(e) => newItem = e.target.value} />
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
