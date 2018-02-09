// @flow
import React from 'react';
import { Route, type Match } from 'react-router';
import { Link } from 'react-router-dom';
import Product from './Product';

export type ProductItem = {
  id: number,
  name: string,
  description: string,
  status: string,
}

const Products = ({ match }: { match: Match}) => {
  const productsData: ProductItem[] = [
    {
      id: 1,
      name: 'NIKE Liteforce Blue Sneakers',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie.',
      status: 'Available',

    },
    {
      id: 2,
      name: 'Stylised Flip Flops and Slippers',
      description: 'Mauris finibus, massa eu tempor volutpat, magna dolor euismod dolor.',
      status: 'Out of Stock',

    },
    {
      id: 3,
      name: 'ADIDAS Adispree Running Shoes',
      description: 'Maecenas condimentum porttitor auctor. Maecenas viverra fringilla felis, eu pretium.',
      status: 'Available',
    },
    {
      id: 4,
      name: 'ADIDAS Mid Sneakers',
      description: 'Ut hendrerit venenatis lacus, vel lacinia ipsum fermentum vel. Cras.',
      status: 'Out of Stock',
    },
  ];

  /* Crea un arreglo de `<li>` por cada producto */
  const linkList = productsData.map(product => (
    <li key={product.id}>
      <Link to={`${match.url}/${product.id}`}>
        {product.name}
      </Link>
    </li>
  ));

  return (
    <div>
      <div>
        <div>
          <h3> Products</h3>
          <ul> {linkList} </ul>
        </div>
      </div>

      <Route
        path={`${match.path}/:productId`}
        render={props => <Product data={productsData} {...props} />}
      />
      <Route
        exact
        path={match.path}
        render={() => (
          <div>Por favor seleccione un Producto.</div>
        )}
      />
    </div>
  );
};

export default Products;
