import { useState } from 'react';
import { Modal, Form, Alert, Button } from 'react-bootstrap';

// import { useForm } from 'react-hook-form'

export default function FavoriteItemPage({ isOpen, close, favorite, itemId }) {

    const [favoriteListData, setFavoriteListData] = useState(favorite);
    console.log(favorite);
    console.log(itemId);

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header >
                <Modal.Title>Edit Favorites List Item</Modal.Title>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" />
            </Modal.Header>
            <Modal.Body>
                <Form > {/*onSubmit={handleSubmit(onSubmit)*/}
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter item">{favorite}</Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={close}> */}
                <Button variant="secondary">
                    Cancel
                </Button>
                <Button variant="primary" >
                    {/* <Button variant="primary" onClick={handleSubmit(onSubmit)}> */}
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>

    )
}
