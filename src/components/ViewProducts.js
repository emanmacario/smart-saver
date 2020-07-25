import React, { useState } from 'react';

import AddProductForm from './AddProductForm';
import Product from './Product';
import ProductsPagination from './ProductsPagination';
import SearchForm from './SearchForm';
import useFetchProducts from './useFetchProducts';

import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';


function ViewProducts() {
  const [params, setParams] = useState({}); // useState({ name: '', onSpecial: false });
  const [page, setPage] = useState(1);
  const [changed, setChanged] = useState(false);
  const { products, loading, error, hasNextPage } = useFetchProducts(params, page, changed);

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
    setChanged(!changed);
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

  /**
   * Handles addition of product by the user
   */
  const handleAdd = () => {
    setChanged(!changed);
    setPage(1);
  }

  return (
    <Container className="my-4">
      <h3>Add Product</h3>
      <AddProductForm setChanged={setChanged} />
      <div className="row my-2">
        <div className="col">
          <h3>Search</h3>
          <SearchForm params={params} onParamChange={handleParamChange} />
        </div>
        <div className="col">
        </div>
      </div>

      <h3>My Products</h3>
      <ProductsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {console.log(`Products: ${JSON.stringify(products)}`)}
      {console.log(`Has Next Page: ${hasNextPage}`)}
      {loading && <div><Spinner as="span" animation="border"/><h4>Loading...</h4></div>}
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