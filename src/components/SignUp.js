import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function SignUp(props) {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        const user = {
            username: username,
            email: email,
            password: password
        }

        console.log(`Username: ${username}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        
        axios.post('http://localhost:5000/users/register', user)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="signUp" style={styles.signUp}>
            <h1 style={styles.h1}>Create Account</h1>
            <Form noValidate validate={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        required
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}/>
                    <Form.Control.Feedback>
                        Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter a username
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        required
                        type="email"
                        placeholder="Enter email" 
                        onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address
                    </Form.Control.Feedback>
                </Form.Group>
                <Button className="float-right" variant="primary" type="submit">
                    Sign up
                </Button>
            </Form>
        </div>
    )
}

const styles = {
    signUp: {
        width: "33%",
        padding: "1.5em",
        borderRadius: "10%",
        backgroundColor: "rgba(255, 255, 255, 0.815)",
        margin: "auto"
    },

    h1: {
        fontSize: "24px",
    }
};

export default SignUp;