import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function SignUp(props) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Handling signup submit");
    
    axios.post('http://localhost:5000/users/register/', {
      username: username,
      password: password,
      email: email
    }, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Sign up response: ")
      console.log(res);

      if (res.status === 200) {
        setRedirectPath('/login');
      }
    })
    .catch((err) => {
      console.log(`Login error: ${err}`);
    })
  }

  // Redirect to login page on sign up completion
  if (redirectPath) {
    return <Redirect to={{ pathname: redirectPath }} />
  } 

  return (
    <div className="signup" style={styles.signup}>
      <h4>Create Account</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            required
            type="text" 
            placeholder="Enter username" 
            onChange={(e) => setUsername(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            required 
            type="email" 
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            required 
            type="password"
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        <Button 
          className="float-right" 
          variant="primary" 
          type="submit">
          Submit
        </Button>
      </Form>
    </div>
    
  )
}

const styles = {
  signup: {
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