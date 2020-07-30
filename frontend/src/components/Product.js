import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';

function Product({ product, handleRemove }) {
  const productNumber = product.productNumber;
  const [open, setOpen] = useState(false);

  // For image, align-content-center and justify-content-end
  // https://www.youtube.com/watch?v=qmPmwdshCMw&list=PL55RiY5tL51rLqH4-8LBVlUTIFF70dxhb&index=2

  // CSS Flexbox: https://getbootstrap.com/docs/4.0/utilities/flex/
  // Core UI Bootstrap 4.0 cards

  // https://www.pair.com/support/kb/understanding-bootstraps-grid-system/#:~:text=A%20container%20is%20a%20%3Cdiv,page%20and%20from%20other%20containers.

  return (
    <Card className="shadow mb-3 col-10">
      <Card.Body className="pt-4">
        <div className="d-flex justify-content-between">
          <div className="col-8">
            <Card.Title>
              {product.name}
            </Card.Title>
            <Card.Subtitle className="text-muted mb2">
              {product.description}
            </Card.Subtitle>
            {product.onSpecial && <h4 className="my-2"><Badge variant="success" className="my-2">Special</Badge></h4>}
            {!product.onSpecial && <h4 className="my-2"><Badge variant="secondary" className="my-2">Normal Price</Badge></h4>}
            <Card.Text as="h5" className="font-weight-normal mb-2">
              Now ${product.price.toFixed(2)}
            </Card.Text>
            <Card.Text as="h6" className="font-weight-normal text-muted mb-4">
              Was ${product.prevPrice.toFixed(2)}
            </Card.Text>
            <span>
              <Button 
                variant="outline-secondary" 
                className="mr-2" 
                onClick={() => setOpen(prevOpen => !prevOpen)}
              >
                {open ? 'Hide Details' : 'Product Details'}
              </Button>
              <Button variant="danger" onClick={() => handleRemove(productNumber)}>
                Remove
              </Button>
            </span>
            <Collapse in={open}>
              <div className="mt-4">
                <p>
                  Description: hello world
                  It is me
                </p>
              </div>
            </Collapse>
          </div>
          <div className="col-4">
            <Card.Img src={product.imagePath} />
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Product;