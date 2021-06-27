import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/macro';
import { getProducts } from '../api/api';

const ProductsListStyled = styled.ul``;

const ProductsListItem = styled.li`
  margin-bottom: 1em;
`;

const ProductImage = styled.img`
  max-width: 5em;
  max-height: 5em;
  margin-right: 1em;
`;

export default function ProductsList() {
  const productsQuery = useQuery('products', getProducts);

  return (
    <ProductsListStyled>
      {productsQuery.data?.map((product) => (
        <ProductsListItem key={product.id}>
          {product.pictureFilename !== null ? (
            <ProductImage
              src={`http://localhost:3001/uploads/${product.pictureFilename}`}
              alt={product.name}
            ></ProductImage>
          ) : null}
          {product.name}
        </ProductsListItem>
      ))}
    </ProductsListStyled>
  );
}
