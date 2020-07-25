import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCard(props) {
  const [product, setProduct] = useState(null);

  const handleClick = () => {
    console.log('Clicked to remove product');
    axios.delete(`http://localhost:5000/users/products/${props.product.productNumber}`,
    {
      withCredentials: true
    })
    .then((res) => {
      console.log(res.status);
      console.log(res.data);
      props.setRemoved(true);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.data);
    });
  }

  return (
    <Card className="text-center">
      <Card.Header as="h5">
        {`Save $${props.product.savingsAmount.toFixed(2)}`}
      </Card.Header>
      <Card.Img style={styles.productImage} variant="bottom" src={props.product.imagePath} />
      <Card.Body>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text style={styles.productPrice}>
          {`$${props.product.price.toFixed(2)}`}
        </Card.Text>
        <Card.Text>
          {`Was $${props.product.prevPrice.toFixed(2)}`}
        </Card.Text>
        <Button variant="danger" onClick={handleClick}>Remove</Button>
      </Card.Body>
      <Card.Footer>
      </Card.Footer>
    </Card>
  )
}

const styles = {
  productImage: {
    width: "40%",
    margin: "auto",
    display: "block",
    paddingTop: "15px"
  },
  productPrice: {
    fontSize: "24px"
  }
}

export default ProductCard;