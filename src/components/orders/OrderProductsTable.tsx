import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import styled from 'styled-components/macro';

const CountCell = styled(TableCell)`
  display: flex;
  align-items: center;
`;

const CountLabel = styled.span`
  margin: 0 5px;
`;

const CountChangeButton = styled.div`
  cursor: pointer;
`;

interface OrderProduct {
  id: number;
  name: string;
  price: number;
  pictureFilename: string | null;
  count: number;
}

interface OrderProductsTableProps {
  products: OrderProduct[];
  onProductCountChange: (productId: number, count: number) => void;
}
export default function OrderProductsTable({ products, onProductCountChange }: OrderProductsTableProps) {
  const handleCountMinusButton = (product: OrderProduct) => {
    if (product.count <= 1) {
      return;
    }
    onProductCountChange(product.id, product.count - 1);
  };
  const handleCountPlusButton = (product: OrderProduct) => {
    onProductCountChange(product.id, product.count + 1);
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <CountCell>
                <CountChangeButton onClick={() => handleCountMinusButton(product)}>
                  <RemoveCircleIcon color="primary"></RemoveCircleIcon>
                </CountChangeButton>
                <CountLabel>{product.count}</CountLabel>
                <CountChangeButton onClick={() => handleCountPlusButton(product)}>
                  <AddCircleIcon color="primary"></AddCircleIcon>
                </CountChangeButton>
              </CountCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
