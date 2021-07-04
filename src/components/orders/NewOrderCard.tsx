import { Button, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { useQueries, UseQueryResult } from 'react-query';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { getProduct } from '../../api/api';
import { ProductDto } from '../../api/dto/ProductDto';
import { useCreateOrderMutation } from '../../hooks/useCreateOrderMutation';
import OrderProductsTable from './OrderProductsTable';
import SelectProductDialog from './SelectProductDialog';

const CardContainer = styled(Paper)`
  padding: 20px;
`;

interface OrderProduct {
  id: number;
  count: number;
}

export default function NewOrderCard() {
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);
  const [selectProductDialogOpen, setSelectProductDialogOpen] = useState(false);

  const history = useHistory();
  // TODO: Try .mutateAsync instead on onSuccess callbacks.
  const createOrderMutation = useCreateOrderMutation(() => history.push('/orders'));

  const handleSelectProduct = (productId: number) => {
    setOrderProducts((state) =>
      !state.some((product) => product.id === productId) ? [{ id: productId, count: 1 }, ...state] : state
    );
  };

  const handleProductCountChange = (productId: number, count: number) => {
    setOrderProducts((state) => {
      const productIndex = state.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        const product = state[productIndex];
        const newProduct = { ...product, count: count };
        const newState = [...state];
        newState[productIndex] = newProduct;
        return newState;
      }
      return state;
    });
  };

  const handleCreateOrder = () => {
    createOrderMutation.mutate({ products: orderProducts });
  };

  const productQueries = useQueries(
    orderProducts.map((product) => ({
      queryKey: ['product', product.id],
      queryFn: async () => await getProduct(product.id),
    }))
  ) as UseQueryResult<ProductDto>[];

  /** Not null when all the products are successfully fetched. */
  const productsData = productQueries.every((q) => q.status === 'success') ? productQueries.map((q) => q.data!) : null;

  return (
    <>
      <CardContainer>
        <h1>New Order</h1>

        <Button variant="contained" color="primary" onClick={() => setSelectProductDialogOpen(true)}>
          Add Product
        </Button>

        {productsData !== null && (
          <OrderProductsTable
            products={orderProducts.map((orderProduct) => ({
              count: orderProduct.count,
              ...productsData.find((p) => p.id === orderProduct.id)!,
            }))}
            onProductCountChange={handleProductCountChange}
          ></OrderProductsTable>
        )}

        <Button variant="contained" color="primary" onClick={handleCreateOrder}>
          Create new product
        </Button>
      </CardContainer>

      <SelectProductDialog
        open={selectProductDialogOpen}
        onClose={() => setSelectProductDialogOpen(false)}
        onSelect={handleSelectProduct}
      ></SelectProductDialog>
    </>
  );
}
