import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import AlertDismissible from './AlertDismissible';
import axios from 'axios';


function Login({ setIsAuth }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const user = {
      username: username,
      password: password
    }
    
    axios.post('/users/login', user, { 
      withCredentials: true 
    })
    .then((res) => {
      if (res.status === 200) {
        console.log('User logged in successfully');
        setMessage('Logged in successfully');
        setVariant('success');
        setShow(true);
        setLoading(false);
        setIsAuth(true);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        console.log(JSON.stringify(err.response.data));
        setMessage(err.response.data.message);
        setVariant('danger');
        setShow(true);
        setLoading(false);
      }
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
            <AlertDismissible variant={variant} message={message} show={show} setShow={setShow} />
            <Form.Group className="d-flex justify-content-end mt-4 pt-4">
              <Button
                variant="primary"
                disabled={loading}
                type="submit">
                {!loading ? 'Log In' : <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                      />}
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;