import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function Login({ setIsAuth, history }) {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: email,
      username: username,
      password: password
    }

    console.log(JSON.stringify(user));
    
    axios.post('http://localhost:5000/users/login', user, { 
      withCredentials: true 
    })
    .then((res) => {
      console.log("Login response:")
      console.log(res.data);
      if (res.status === 200) {
        console.log("Res status is 200")
        setIsAuth(true);
        history.push('/viewProducts');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center">
      <div className='col-md-3 p-5 mt-5 rounded shadow'>
        <h4 className="mb-4">Log In</h4>
        <div className="mt-4 py-4">
          <hr className="mb-4" />
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control 
                required 
                type="text" 
                placeholder="Enter username" 
                onChange={(event) => setUsername(event.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                required 
                type="password" 
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>
            <Form.Group className="d-flex justify-content-end my-4">
              <Button
                variant="primary" 
                type="submit">
                Login
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;