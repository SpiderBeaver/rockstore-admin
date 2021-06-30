import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import SelectProductView from './SelectProductView';

const ViewContainer = styled.div`
  width: 550px;
  height: 400px;
`;

interface SelectProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (productId: number) => void;
}
export default function SelectProductDialog({ open, onClose, onSelect }: SelectProductDialogProps) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedProductId(null);
  }, [open]);

  const handleSelectButtonClick = () => {
    if (selectedProductId !== null) {
      onSelect(selectedProductId);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Product</DialogTitle>
      <DialogContent>
        <ViewContainer>
          <SelectProductView onProductSelect={(productId) => setSelectedProductId(productId)}></SelectProductView>
        </ViewContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSelectButtonClick} color="primary" autoFocus>
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
}
