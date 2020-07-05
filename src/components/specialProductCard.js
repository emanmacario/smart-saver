import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function SpecialProductCard(props) {

    const handleClick = () => {
        // TODO: Remove product by calling a passed props method
        return null;
    }

    return (
        <Card className="text-center">
            <Card.Header>
                <medium><strong>WAS {props.product.prevPrice}</strong></medium>
            </Card.Header>
            <Card.Img style={styles.productImage} variant="top" src={props.product.imagePath} />
            <Card.Body>
                <Card.Title>{props.product.name}</Card.Title>
                <Card.Text style={styles.productPrice}>
                    Save ${props.product.savingsAmount}
                </Card.Text>
                <Button variant="danger">Remove</Button>
            </Card.Body>
            <Card.Footer>
                <medium><strong>NOW ${props.product.price}</strong></medium>
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
        fontSize: "20px"
    }
}

export default SpecialProductCard;