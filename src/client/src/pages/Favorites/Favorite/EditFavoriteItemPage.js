import { Modal, Form, Alert, Button } from 'react-bootstrap';
// import { useForm } from 'react-hook-form'

export default function FavoriteItemPage({ isOpen, close }) {

    // const handleSubmit = () => {
    //     close
    // }

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header >
                <Modal.Title>Add Favorites</Modal.Title>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" />
            </Modal.Header>
            <Modal.Body>
                <Form > {/*onSubmit={handleSubmit(onSubmit)*/}
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type a title for list" />
                        {/*...register("password")*/}

                        <Form.Text>
                            <Alert variant="danger">
                                Are you sure_
                            </Alert>
                        </Form.Text>

                        {/* {errors?.password && (
							<Form.Text>
							<Alert variant="danger">
								{errors.password.message}
							</Alert>
						</Form.Text>
							)} */}
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
