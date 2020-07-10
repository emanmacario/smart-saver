import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductCard from './productCard';
import ProductDeck from './productDeck';

import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';



function ViewProducts(props) {
    

    const [isLoading, setIsLoading] = useState(true);

    const [products, setProducts] = useState(null);
    const [specials, setSpecials] = useState(null);
    const [normals, setNormals] = useState(null); 
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/users/products', { withCredentials: true })
            .then(res => {
                setProducts(res.data.products);
                console.log("Response data: " + JSON.stringify(res.data));
                if (res.data.products) {
                    console.log("PRODUCTS LENGTH: " + res.data.products.length);
                }
            })
            .catch(err => {
                console.log(err);
                console.log(err.status);
                console.log(err.data);
            });
        return () => {
            setRemoved(false);
        }
    }, [removed]);


    // Slices the array of products into sub-arrays
    const splitProducts = (products) => {
        const rowSize = 3;
        var rows = [];
        for (let i = 0; i < products.length; i += rowSize) {
            rows.push(products.slice(i, i + rowSize));
        }
        return rows;
    }


    if (!products) {
        return (
            <Container>
                <h3>My Products</h3>
                { isLoading ? 
                    <div><br /><Spinner animation="grow" /></div>
                    :
                    (!products) ? <p>You currently have no products</p> : null
                }
                
            </Container>
        )
    }

    if (products.length == 0) {
        return (
            <Container>
                <h3>My Products</h3>
                <br />
                <p>You currently have no products</p>
            </Container>
        )
    }

    return (
        <Container>
            <h3>My Products</h3>
            <br/>
            {
                splitProducts(products).map((row, index) => (
                    <div key={index}>
                        <ProductDeck key={index} products={row} setRemoved={setRemoved} />
                        <br/>
                    </div>
                ))
            }
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
        fontSize: "24px"
    }
}

export default ViewProducts;