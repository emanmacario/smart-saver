import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ViewProducts(props) {
    const [products, setProducts] = useState([]);


    return (
        <Container>
            <p>This is the ViewProducts component</p>
            <CardDeck>
                <Card className="text-center">
                    <Card.Header><strong>SAVE $0.55</strong></Card.Header>
                    <Card.Img style={styles.productImage} variant="bottom" src="https://cdn0.woolworths.media/content/wowproductimages/large/412367.jpg" />
                    <Card.Body>
                        <Card.Title>Woolworths Potato & Leek Soup </Card.Title>
                        <Card.Text style={styles.productPrice}>
                            Was $3.75
                        </Card.Text>
                        <Button variant="danger">Remove</Button>
                    </Card.Body>
                    <Card.Footer>
                        <medium className="text"><strong>NOW $2.50</strong></medium>
                    </Card.Footer>
                </Card>
                <Card className="text-center">
                    <Card.Header>SPECIAL</Card.Header>
                    <Card.Img style={styles.productImage} variant="bottom" src="https://cdn0.woolworths.media/content/wowproductimages/large/412367.jpg" />
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
                    <Card.Img style={styles.productImage} variant="bottom" src="https://cdn0.woolworths.media/content/wowproductimages/large/412367.jpg" />
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
        </Container>
    )
}


const styles = {
    productImage: {
        width: "50%",
        margin: "auto",
        display: "block"
    },
    productPrice: {
        fontSize: "20px"
    }
}

export default ViewProducts;