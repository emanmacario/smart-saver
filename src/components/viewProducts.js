import React, { useState } from 'react';

import Product from './Product';
import ProductsPagination from './ProductsPagination';
import SearchForm from './SearchForm';
import useFetchProducts from './useFetchProducts';

import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';


function ViewProducts() {
    const [params, setParams] = useState({}); // useState({ name: '', onSpecial: false });
    const [page, setPage] = useState(1);
    const [removed, setRemoved] = useState(false);
    const { products, loading, error, hasNextPage } = useFetchProducts(params, page, removed);

    /**
     * Handle search form parameter change
     * @param {event} event 
     */
    const handleParamChange = (event) => {
        const param = event.target.name;
        const value = param == 'onSpecial' ? !params.onSpecial : event.target.value;
        setPage(1);
        setParams((prevParams) => {
            return { ...prevParams, [param]: value }
        });
    }

    /**
     * Handles removal of a product by the user
     * @param {number} productNumber 
     */
    const handleRemove = (productNumber) => {
        setRemoved(!removed);
        setPage(1);
        axios.delete(`http://localhost:5000/users/products/${productNumber}`, {
            withCredentials: true
        })
        .then((res) => {
            console.log(res.status);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
            console.log(err.data);
        });
    }

    return (
        <Container className="my-4">
            <h3>My Products</h3>
            <SearchForm params={params} onParamChange={handleParamChange} />
            <ProductsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
            {console.log(`Products: ${JSON.stringify(products)}`)}
            {console.log(`Has Next Page: ${hasNextPage}`)}
            {loading && <div><Spinner animation="border"/><span><h4>Loading...</h4></span></div>}
            {products.map(product => {
                return <Product key={product.productNumber} product={product} handleRemove={handleRemove} />
            })}
            <ProductsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
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