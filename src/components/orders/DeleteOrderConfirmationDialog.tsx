import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { OrderDto } from '../../api/dto/OrderDto';

export interface DeleteOrderConfirmationDialogProps {
  order: OrderDto;
  open: boolean;
  onClose: () => void;
  onConfirm: (order: OrderDto) => void;
}
export default function DeleteProductConfirmationDialog({
  order,
  open,
  onClose,
  onConfirm,
}: DeleteOrderConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete the order?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => onConfirm(order)}>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
