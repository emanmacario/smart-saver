import React, { useState } from 'react';

import Product from './Product';
import ProductsPagination from './ProductsPagination';
import SearchForm from './SearchForm';
import useFetchProducts from './useFetchProducts';

import { Container, Spinner } from 'react-bootstrap';




function ViewProducts() {
    const [params, setParams] = useState({}); // useState({ name: '', onSpecial: false });
    const [page, setPage] = useState(1);
    const { products, loading, error, hasNextPage } = useFetchProducts(params, page);

    // Handle search form parameter changes
    const handleParamChange = (e) => {
        const param = e.target.name;
        const value = param == 'onSpecial' ? !params.onSpecial : e.target.value;
        setPage(1);
        setParams((prevParams) => {
            return { ...prevParams, [param]: value }
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
                return <Product key={product.productNumber} product={product} />
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