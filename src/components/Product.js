import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';

function Product({ product }) {

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {product.name}
            </Card.Title>
            <Card.Subtitle className="text-muted mb2">
              {product.description}
            </Card.Subtitle>
            {product.onSpecial ? <Badge variant="success" className="my-2">On Special</Badge>
                               : <Badge variant="secondary" className="my-2">Normal Price</Badge>}
            <Card.Text>
              Previous: ${product.prevPrice}
            </Card.Text>
            <Card.Text>
              Current: ${product.price}
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Product;