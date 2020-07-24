import React from 'react';
import { Form, Col } from 'react-bootstrap';

function SearchForm({ params, onParamChange }) {

  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Search products</Form.Label>
          <Form.Control 
            onChange={onParamChange} 
            value={params.name} 
            name="name" 
            type="text"
            placeholder="Enter product name"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Add product</Form.Label>
          <Form.Control 
            onChange={onParamChange} 
            value={params.url} 
            name="url" 
            type="text"
            placeholder="Enter product URL"
          />
        </Form.Group>

        <Form.Group as={Col} xs="auto" className="ml-2">
          <Form.Check 
            onChange={onParamChange} 
            value={params.onSpecial} 
            name="onSpecial" 
            label="Only Specials"
            type="checkbox"
            className="mb-2"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  )
}

export default SearchForm;