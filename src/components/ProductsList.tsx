import React from 'react';
import { useQuery } from 'react-query';
import { getProducts } from '../api/api';

export default function ProductsList() {
  const productsQuery = useQuery('products', getProducts);

  return (
    <ul>
      {productsQuery.data?.map((product) => (
        <li key={product.id}>
          {product.pictureFilename !== null ? (
            <img src={`http://localhost:3001/uploads/${product.pictureFilename}`} alt={product.name}></img>
          ) : null}
          {product.name}
        </li>
      ))}
    </ul>
  );
}
