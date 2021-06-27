import React from 'react';
import styled from 'styled-components/macro';
import ProductsList from './ProductsList';

const ProductsCardStyled = styled.div`
  background-color: #fff;
  padding: 1em;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default function ProductsCard() {
  return (
    <ProductsCardStyled>
      <h2>Products</h2>
      <ProductsList page={1}></ProductsList>
    </ProductsCardStyled>
  );
}
