import React, { useState, useEffect } from 'react';

import CardDeck from 'react-bootstrap/CardDeck';

import ProductCard from './ProductCard';
import Card from 'react-bootstrap/Card';


function ProductDeck(props) {
  
  const getEmptyCards = () => {
    const rowSize = 3;
    var length = props.products.length;

    var cards = []
    for (var i = 0; i < rowSize - length; i++) {
      cards.push(
        <Card style={styles.emptyCard} key={i} />
      )
    }
    return cards;
  }

  return (
    <CardDeck>
      {
        (props.products).map(product => (
          <ProductCard 
            key={product.productNumber}
            product={product} 
            setRemoved={props.setRemoved} />
        ))
      }
      { 
        getEmptyCards() 
      }
    </CardDeck>
  )
}

const styles = {
  emptyCard: {
    borderWidth: "0px"
  }
}

export default ProductDeck;