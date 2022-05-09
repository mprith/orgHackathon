import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import HomePage from './HomePage';
import { employeeData } from "../Constant";
import "./LoginPage.scss";

export default function LoginPage(props) {
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const [empId, setEmpId] = useState("");

    const handleOnSubmit = () => {
        if (empId !== '') {
            if (employeeData.indexOf(empId) > -1) {
                setIsLoggedIn(true);
                return 0;
            } else {
                alert("Please enter a valid Emp Id");
            }
        } else {
            alert("Please enter a valid Emp Id");
        }
    }

    const handleOnchange = (e) => {
        setEmpId(e.target.value);
    }

    return (
        <>
            {!isLoggedin && <Form className="loginPage">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control placeholder="Enter employee id" onChange={(e) => { handleOnchange(e) }} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleOnSubmit}>
                    Submit
                </Button>
            </Form>}

            {isLoggedin && <HomePage />}
        </>
    )
}