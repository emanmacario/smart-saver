import React from 'react';
import { Alert, Col } from 'react-bootstrap';

function AlertDismissible({ variant, message, show, setShow }) {
  if (show) {
    return (
      <Col className="d-flex justify-content-start pl-0" xs="auto">
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>
      </Col>
    );
  }
  return null;
}

export default AlertDismissible;