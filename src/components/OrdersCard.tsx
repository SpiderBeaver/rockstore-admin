import React from 'react';
import styled from 'styled-components/macro';
import OrdersTable from './OrdersTable';

const ProductsCardStyled = styled.div`
  background-color: #fff;
  padding: 1em;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default function OrdersCard() {
  return (
    <ProductsCardStyled>
      <h2>Orders</h2>

      <OrdersTable></OrdersTable>
    </ProductsCardStyled>
  );
}
