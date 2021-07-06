import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { OrderDto } from '../../api/dto/OrderDto';

export interface OrdersTableProps {
  orders: OrderDto[];
  onDelete: (order: OrderDto) => void;
}
export default function OrdersTable({ orders, onDelete }: OrdersTableProps) {
  console.log(orders);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.items.map((item) => item.product.name).join(', ')}</TableCell>
              <TableCell>{format(order.createdAt, 'Pp')}</TableCell>
              <TableCell align="right">
                <Link to={`/orders/${order.id}/edit`}>
                  <Button size="small">Edit</Button>
                </Link>
                <Button size="small" color="secondary" onClick={() => onDelete(order)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
