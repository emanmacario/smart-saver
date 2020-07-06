import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function Home(props) {
    const [productUrl, setProductUrl] = useState('');
    const [email, setEmail] = useState('emacario1997@hotmail.com');
    const [showError, setShowError] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitted URL: ' + productUrl);

        try {
            const response = 
                await axios.post('http://localhost:5000/products/add', {
                    url: productUrl
                });
            setShowError(false);
        } catch (err) {
            console.log(err);
            setShowError(true);
        }
    }

    return (
        <div className="productUrlForm" style={styles.productUrlForm}>
            <h1 style={styles.h1}>Add Item</h1>
            <Form>
                <Form.Group controlId="">
                    <Form.Label>Enter Woolworths product URL</Form.Label>
                    <Form.Control 
                        type="text" 
                        required 
                        placeholder="Enter URL" 
                        onChange={(e) => setProductUrl(e.target.value)} />
                </Form.Group>
                <Form.Text className="text-muted">
                    Example: https://www.woolworths.com.au/shop/productdetails/412367/woolworths-potato-leek-soup
                </Form.Text>
            </Form>
            <Button 
                className="float-right" 
                variant="primary" 
                type="submit" 
                onClick={handleSubmit}>
                Add
            </Button>
        </div>
    )
}

const styles = {
    productUrlForm: {
        margin: 'auto',
        width: '40%'
    },
    h1: {
        fontSize: "24px",
        marginTop: "40px"
    }
};

export default Home;