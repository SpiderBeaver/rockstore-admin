import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components/macro';
import ProductsTableView from './ProductsTableView';
import { Link } from 'react-router-dom';

const ProductsCardStyled = styled.div`
  background-color: #fff;
  padding: 1em;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default function ProductsCard() {
  return (
    <ProductsCardStyled>
      <h2>Products</h2>
      <Link to="/products/new">
        <Button variant="contained" color="primary">
          New Product
        </Button>
      </Link>

      <ProductsTableView></ProductsTableView>
    </ProductsCardStyled>
  );
}
