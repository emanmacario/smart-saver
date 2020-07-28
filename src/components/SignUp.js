import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import AlertDismissible from './AlertDismissible';
import axios from 'axios';


function SignUp() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);

  // UX feedback variables
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true);
    
    axios.post('http://localhost:5000/users/register/', {
      username: username,
      password: password,
      email: email
    }, {
      withCredentials: true,
    })
    .then((res) => {
      setLoading(false);
      console.log(JSON.stringify(res.data));
      console.log(`Status: ${res.status}`);
      if (res.status === 200) {
        setMessage(res.data.message);
        setVariant('success');
        setShow(true);
        setTimeout(() => {
          setRedirectPath('/login');
        }, 1500);
      }
    })
    .catch((err) => {
      setLoading(false);
      
      console.log(`Sign Up ${err}`);
      if (err.response) {
        console.log(err.response.data);
        setMessage(err.response.data.message);
        setVariant('danger');
        setShow(true);
      }
    })
  }

  // Redirect to login page on sign up completion
  if (redirectPath) {
    return <Redirect to={{ pathname: redirectPath }} />
  } 

  return (
    <div className="container-fluid d-flex flex-column align-items-center">
      <div className='col-md-3 p-5 mt-5 rounded shadow'>
        <h4 className="mb-4">Sign Up</h4>
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
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                required 
                type="email" 
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}/>
              <Form.Text className="text-muted">
              We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                required 
                type="password"
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <AlertDismissible variant={variant} message={message} show={show} setShow={setShow} />
            <Form.Group className="d-flex justify-content-end pt-4 mt-4">
            <Button
                variant="primary"
                disabled={loading}
                type="submit">
                {!loading ? 'Sign Up' : <Spinner
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

export default SignUp;