import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/macro';
import { getOrders } from '../api/api';
import DataTable from './common/DataTable';

const OrdersTableRoot = styled.div``;

const OrdersTableContainer = styled(TableContainer)`
  grid-column: 1 / 3;
  margin-top: 20px;
`;

export default function OrdersTable() {
  const ordersQuery = useQuery(['orders'], () => getOrders());

  return (
    <OrdersTableRoot>
      {ordersQuery.status === 'success' && (
        <DataTable
          items={ordersQuery.data}
          columns={[
            { name: 'Id', data: (order) => order.id.toString() },
            { name: 'Products', data: (order) => order.items.map((item) => item.product.name).join(', ') },
          ]}
        ></DataTable>
      )}

      <OrdersTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Products</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersQuery.data?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.items.map((item) => item.product.name).join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </OrdersTableContainer>
    </OrdersTableRoot>
  );
}
