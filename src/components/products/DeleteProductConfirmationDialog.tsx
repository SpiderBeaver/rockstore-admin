import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { ProductDto } from '../../api/dto/ProductDto';

export interface DeleteProductConfirmationDialogProps {
  product: ProductDto;
  open: boolean;
  onClose: () => void;
  onConfirm: (product: ProductDto) => void;
}
export default function DeleteProductConfirmationDialog({
  product,
  open,
  onClose,
  onConfirm,
}: DeleteProductConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete product [{product.name}]</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => onConfirm(product)}>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
