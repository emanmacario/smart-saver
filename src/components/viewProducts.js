import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import SpecialProductCardDeck from './specialProductCardDeck';


function ViewProducts(props) {
    const [products, setProducts] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:5000/products/')
            .then(response => {
                setProducts(response.data);
                console.log("Response data: " + JSON.stringify(response.data));
            })
            .catch(err => {
                console.log(err);
            });
    });


    return (
        <Container>
            <p>This is the ViewProducts component</p>

            <h3>On Special Products</h3>
            <br/>
            <CardDeck>
                <Card className="text-center">
                    <Card.Header>
                        <strong>WAS $3.75</strong>
                    </Card.Header>
                    <Card.Img style={styles.productImage} variant="bottom" src="https://cdn0.woolworths.media/content/wowproductimages/large/412367.jpg" />
                    <Card.Body>
                        <Card.Title>Woolworths Potato & Leek Soup </Card.Title>
                        <Card.Text style={styles.productPrice}>
                            Save $0.55
                        </Card.Text>
                        <Button variant="danger">Remove</Button>
                    </Card.Body>
                    <Card.Footer>
                        <strong>NOW $2.50</strong>
                    </Card.Footer>
                </Card>
                <Card className="text-center">
                    <Card.Header>SPECIAL</Card.Header>
                    <Card.Img style={styles.productImage} variant="bottom" src="https://cdn0.woolworths.media/content/wowproductimages/large/38609.jpg" />
                    <Card.Body>
                    <Card.Title>Woolworths Potato & Leek Soup </Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <medium className="text-muted">Last updated 3 mins ago</medium>
                    </Card.Footer>
                </Card>
                <Card className="text-center">
                    <Card.Header>SPECIAL</Card.Header>
                    <Card.Img style={styles.productImage} variant="bottom" src="https://cdn0.woolworths.media/content/wowproductimages/large/826730.jpg" />
                    <Card.Body>
                    <Card.Title>Woolworths Potato & Leek Soup </Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <medium className="text-muted">Last updated 3 mins ago</medium>
                    </Card.Footer>
                </Card>
            </CardDeck>

            <SpecialProductCardDeck products={products} />
            
        </Container>
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

export default ViewProducts;