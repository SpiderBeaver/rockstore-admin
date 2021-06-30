import { Button, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { useQueries, UseQueryResult } from 'react-query';
import styled from 'styled-components/macro';
import { getProduct } from '../../api/api';
import { ProductDto } from '../../api/dto/ProductDto';
import OrderProductsTable from './OrderProductsTable';
import SelectProductDialog from './SelectProductDialog';

const CardContainer = styled(Paper)`
  padding: 20px;
`;

export default function NewOrderCard() {
  const [productIds, setProductIds] = useState<number[]>([]);
  const [selectProductDialogOpen, setSelectProductDialogOpen] = useState(false);

  const handleSelectProduct = (productId: number) => {
    setProductIds((state) => (!state.includes(productId) ? [productId, ...state] : state));
  };

  const productQueries = useQueries(
    productIds.map((productId) => ({
      queryKey: ['product', productId],
      queryFn: async () => await getProduct(productId),
    }))
  ) as UseQueryResult<ProductDto>[];

  return (
    <>
      <CardContainer>
        <h1>New Order</h1>

        <Button variant="contained" color="primary" onClick={() => setSelectProductDialogOpen(true)}>
          Add Product
        </Button>

        {productQueries.every((q) => q.status === 'success') && (
          <OrderProductsTable products={productQueries.map((q) => q.data!)}></OrderProductsTable>
        )}
      </CardContainer>

      <SelectProductDialog
        open={selectProductDialogOpen}
        onClose={() => setSelectProductDialogOpen(false)}
        onSelect={handleSelectProduct}
      ></SelectProductDialog>
    </>
  );
}
