import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';

export interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  confirmButtonText: string;
  onConfirm: () => void;
}
export default function ConfirmationDialog({ open, onClose, title, content, onConfirm }: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onConfirm}>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
