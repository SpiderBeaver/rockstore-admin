import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import styled from 'styled-components/macro';
import { useQueries, UseQueryResult } from 'react-query';
import { getProduct } from '../../api/api';
import { ProductDto } from '../../api/dto/ProductDto';

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
  count: number;
}

interface OrderProductsTableProps {
  orderProducts: OrderProduct[];
  onProductCountChange: (productId: number, count: number) => void;
}
export default function OrderProductsTable({ orderProducts, onProductCountChange }: OrderProductsTableProps) {
  const productQueries = useQueries(
    orderProducts.map((orderProduct) => ({
      queryKey: ['product', orderProduct.id],
      queryFn: async () => await getProduct(orderProduct.id),
    }))
  ) as UseQueryResult<ProductDto>[];

  /** Not null when all the products are successfully fetched. */
  const productsData = productQueries.every((q) => q.status === 'success') ? productQueries.map((q) => q.data!) : null;

  const handleCountMinusButton = (product: OrderProduct) => {
    if (product.count <= 1) {
      return;
    }
    onProductCountChange(product.id, product.count - 1);
  };

  const handleCountPlusButton = (product: OrderProduct) => {
    onProductCountChange(product.id, product.count + 1);
  };

  const ProductRow = ({ product, orderProduct }: { product: ProductDto; orderProduct: OrderProduct }) => (
    <TableRow key={product.id}>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <CountCell>
        <CountChangeButton onClick={() => handleCountMinusButton(orderProduct)}>
          <RemoveCircleIcon color="primary"></RemoveCircleIcon>
        </CountChangeButton>
        <CountLabel>{orderProduct.count}</CountLabel>
        <CountChangeButton onClick={() => handleCountPlusButton(orderProduct)}>
          <AddCircleIcon color="primary"></AddCircleIcon>
        </CountChangeButton>
      </CountCell>
    </TableRow>
  );

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
          {productsData !== null &&
            orderProducts.map((orderProduct) => (
              <ProductRow
                orderProduct={orderProduct}
                product={productsData.find((product) => product.id === orderProduct.id)!}
              ></ProductRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
