import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';

function Product({ product, handleRemove }) {
  const [open, setOpen] = useState(false);

  // JSX card elements
  const specialBadge = (
    <h4 className="my-2">
      <Badge variant="success" className="my-2">Special</Badge>
    </h4>
  )
  
  const normalBadge = (
    <h4 className="my-2">
      <Badge variant="secondary" className="my-2">Normal Price</Badge>
    </h4>
  )

  const specialInfo = (
    <div>
      <Card.Text as="h5" className="font-weight-normal text-muted">
        Was: ${product.prevPrice.toFixed(2)}
      </Card.Text>
      <Card.Text as="h5" className="font-weight-normal text-muted mb-4">
        Save: ${product.savingsAmount.toFixed(2)}
      </Card.Text>
    </div>
  )

  return (
    <Card className="shadow mb-3 col-10">
      <Card.Body className="pt-4">
        <div className="d-flex justify-content-between">
          <div className="col-8">
            <Card.Title>
              {product.name}
            </Card.Title>
            <Card.Subtitle className="text-muted mb2">
              {product.description.split('<br>').join(' ')}
            </Card.Subtitle>
            {product.onSpecial ? specialBadge : normalBadge}
            <Card.Text as="h4" className="font-weight-normal mb-4">
              Price: ${product.price.toFixed(2)}
            </Card.Text>
            {product.onSpecial && specialInfo}
            <span >
              <Button 
                variant="outline-secondary" 
                className="mr-2" 
                onClick={() => setOpen(prevOpen => !prevOpen)}
              >
                {open ? 'Hide Details' : 'Product Details'}
              </Button>
              <Button variant="danger" onClick={() => handleRemove(product.number)}>
                Remove
              </Button>
            </span>
            <Collapse in={open}>
              <div className="mt-4 text-muted">
                {product.lastOnSpecialStart && 
                  <p>Last Special Start Date:&nbsp;
                    {new Date(product.lastOnSpecialStart).toLocaleDateString('en-GB')}</p>}
                {product.lastOnSpecialEnd && 
                  <p>Last Special Start:&nbsp;
                    {new Date(product.lastOnSpecialEnd).toLocaleDateString('en-GB')}</p>}
                <p>Product URL: <a href={product.url}>{product.url}</a></p>
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