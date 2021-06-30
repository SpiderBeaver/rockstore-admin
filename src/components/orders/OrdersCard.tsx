import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import OrdersTableView from './OrdersTableView';

const ProductsCardStyled = styled.div`
  background-color: #fff;
  padding: 1em;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default function OrdersCard() {
  return (
    <ProductsCardStyled>
      <h2>Orders</h2>

      <Link to="/orders/new">
        <Button variant="contained" color="primary">
          New Order
        </Button>
      </Link>

      <OrdersTableView></OrdersTableView>
    </ProductsCardStyled>
  );
}
