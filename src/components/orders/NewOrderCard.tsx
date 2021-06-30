import { Button, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import SelectProductDialog from './SelectProductDialog';

const CardContainer = styled(Paper)`
  padding: 20px;
`;

export default function NewOrderCard() {
  const [selectProductDialogOpen, setSelectProductDialogOpen] = useState(false);

  return (
    <>
      <CardContainer>
        <h1>New Order</h1>

        <Button variant="contained" color="primary" onClick={() => setSelectProductDialogOpen(true)}>
          Add Product
        </Button>
      </CardContainer>

      <SelectProductDialog
        open={selectProductDialogOpen}
        onClose={() => setSelectProductDialogOpen(false)}
        onSelect={(productId) => console.log(productId)}
      ></SelectProductDialog>
    </>
  );
}
