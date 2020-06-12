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
            <Form>
                <Form.Group controlId="">
                    <Form.Label>Enter product URL</Form.Label>
                    <Form.Control 
                        type="text" 
                        required 
                        placeholder="Enter Woolworths product URL" 
                        onChange={(e) => setProductUrl(e.target.value)} />
                </Form.Group>
            </Form>
            <Button 
                className="float-right" 
                variant="primary" 
                type="submit" 
                onClick={handleSubmit}>
                Add
            </Button>
            
            {//showError ? <div><br /><Alert variant='danger'>The URL you have entered is invalid</Alert></div>
             //          : <div><br /><Alert variant='success'>Your product has been added</Alert></div>
            }
        </div>
    )
}

const styles = {
    productUrlForm: {
        margin: 'auto',
        width: '40%'
    }
};

export default Home;