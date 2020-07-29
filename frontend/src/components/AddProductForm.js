import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';


function AddProductForm({ onAdd }) {
  const [productUrl, setProductUrl] = useState('');

  const handleClick = (event, productUrl) => {
    setProductUrl('');
    onAdd(event, productUrl);
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
            value={productUrl}
            placeholder="Enter Woolworths product URL"
            onChange={(event) => setProductUrl(event.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button 
            className="my-2"
            variant="primary"
            type="submit" 
            onClick={(event) => handleClick(event, productUrl)}
          >
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
}

export default AddProductForm;