import React, { useState } from 'react';

import AddProductForm from './AddProductForm';
import AlertDismissible from './AlertDismissible';
import Product from './Product';
import ProductsPagination from './ProductsPagination';
import SearchForm from './SearchForm';
import useFetchProducts from './useFetchProducts';

import axios from 'axios';
import { Alert, Container, Spinner } from 'react-bootstrap';


function ViewProducts() {
  const [params, setParams] = useState({}); // useState({ name: '', onSpecial: false });
  const [page, setPage] = useState(1);
  const [changed, setChanged] = useState(false);
  const [variant, setVariant] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
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
   * Handles addition of a product by the user
   * @param {event} event 
   * @param {string} productUrl 
   */
  const handleAdd = (event, productUrl) => {
    event.preventDefault();
    axios.post('http://localhost:5000/users/products', { 
        url: productUrl 
    }, { 
        withCredentials: true 
    })
    .then((res) => {
        console.log(res.status);
        console.log(res.data);
        setChanged(!changed);
        setPage(1);

        if (res.status == 200) {
          setVariant("success");
          setShow(true);
          setMessage(res.data.message);
        }
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        if (err.response.status == 400 || err.response.status == 500) {
          console.log("SHOULD SHOW ALERT");
          setVariant("danger");
          setShow(true);
          setMessage(err.response.data.message);
        }
      }
    });
  }

  return (
    <Container className="my-4">
      <h3>Add Product</h3>
      <AddProductForm onAdd={handleAdd} />
      {show && <AlertDismissible variant={variant} message={message} show={show} setShow={setShow} />}
      
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