// @flow
import React from 'react';
import { type Match } from 'react-router';
import { type ProductItem } from './Products';

const Product = ({ match, data }: { match: Match, data: ProductItem[] }) => {
  const product = data.find(p => String(p.id) === match.params.productId);
  const productData = product ? (
    <div>
      <h3> {product.name} </h3>
      <p>{product.description}</p>
      <hr />
      <h4>{product.status}</h4>
    </div>
  )
    :
    <h2>Perdón. El producto no existe </h2>;

  return (
    <div>
      <div>
        {productData}
      </div>
    </div>
  );
};

export default Product;
