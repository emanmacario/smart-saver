import React from 'react';
import { Form, Col } from 'react-bootstrap';

function SearchForm({ params, onParamChange }) {

  return (
    <Form>
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