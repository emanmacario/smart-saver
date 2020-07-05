import React, { useState, useEffect } from 'react';

import CardDeck from 'react-bootstrap/CardDeck';

import SpecialProductCard from './specialProductCard';


function SpecialProductCardDeck(props) {

    useEffect(() => {
        console.log(JSON.stringify("SpecialProductCardDeck products: " + props.products))
        console.log(typeof props.products);
    })
    
    return (
        <CardDeck>
            {null
                /*
                (props.products).map(product => (
                    <SpecialProductCard product={product} />
                ))*/
            }
        </CardDeck>
    )
}

export default SpecialProductCardDeck;