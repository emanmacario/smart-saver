import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';


function AddProductForm({ setChanged }) {
  const [productUrl, setProductUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted URL: ' + productUrl);

    axios.post('http://localhost:5000/users/products', { 
        url: productUrl 
    }, { 
        withCredentials: true 
    })
    .then((res) => {
        console.log(res.status);
        console.log(res.data);
        setChanged(prevChanged => !prevChanged);
        setProductUrl('');
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
      }
    });
  }
  
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-center">
        <Col xs={8}>
          <Form.Label srOnly>Add product</Form.Label>
          <Form.Control
            className="my-2"
            type="text" 
            required 
            placeholder="Enter Woolworths product URL" 
            onChange={(event) => setProductUrl(event.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button 
            className="my-2"
            variant="primary"
            type="submit" 
            onClick={handleSubmit}>
            Add
          </Button>
        </Col>
      </Form.Row>
      <Form.Row className="align-items-top">
        <Form.Text className="ml-2 text-muted">
            Example: https://www.woolworths.com.au/shop/productdetails/412367/woolworths-potato-leek-soup
        </Form.Text>
      </Form.Row>
    </Form>
  )

  return (
    <Form className="pl-0 col-8">
      <Form.Row className="align-items-center">
        <Form.Group as={Col}>
          <Form.Label>Add product</Form.Label>
          <Form.Control
            type="text" 
            required 
            placeholder="Enter URL" 
            onChange={(event) => setProductUrl(event.target.value)}
          />
        </Form.Group>
        <Col xs="auto">
          <Button 
            variant="primary" 
            type="submit" 
            onClick={handleSubmit}>
            Add
          </Button>
        </Col>
      </Form.Row>
      <Form.Row className="align-items-top">
        <Form.Text className="text-muted">
            Example: https://www.woolworths.com.au/shop/productdetails/412367/woolworths-potato-leek-soup
        </Form.Text>
      </Form.Row>
    </Form>
  )
}


export default AddProductForm;