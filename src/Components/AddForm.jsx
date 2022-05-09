import React from 'react';
import "../Container/HomePage.scss";
import { Modal, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import {challengeTag} from  "../Constant";

export default function AddForm(props) {
    const { isModalOpen, handleClose, handleDescOnChange, handleTitleOnChange, handleOnSubmit, handleSelect, tag } = props;

    return (
        <Modal show={isModalOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                Add a challenge
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="formgroup">
                    <Form.Label>Title: </Form.Label>
                    <Form.Control type="text" placeholder="Title" onChange={(e) => handleTitleOnChange(e)} />
                </Form.Group>
                <Form.Group className="formgroup">
                    <Form.Label>Description: </Form.Label>
                    <Form.Control type="text" placeholder="Description" onChange={(e) => handleDescOnChange(e)} />
                </Form.Group>
                <Form.Group className="formgroup">
                    <DropdownButton
                        title={tag ? tag : "Select Tag"}
                        onSelect={handleSelect}>
                        {challengeTag.map(
                            (variant) => (
                                <Dropdown.Item key={variant} eventKey={variant}>{variant}</Dropdown.Item>))}
                    </DropdownButton>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleOnSubmit} type="submit" variant="Secondary">
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )

}