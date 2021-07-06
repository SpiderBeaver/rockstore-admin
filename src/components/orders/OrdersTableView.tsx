import { FormControl, InputLabel, MenuItem, Select, TablePagination } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { OrderDto, OrderStatus } from '../../api/dto/OrderDto';
import { ITEMS_PER_TABLE_PAGE } from '../../constants';
import { useDeleteOrderMutation } from '../../hooks/useDeleteOrderMutation';
import { useOrdersCountQuery } from '../../hooks/useOrdersCountQuery';
import { useOrdersQuery } from '../../hooks/useOrdersQuery';
import DeleteOrderConfirmationDialog from './DeleteOrderConfirmationDialog';
import OrdersTable from './OrdersTable';

const StatusSelectFormControl = styled(FormControl)`
  min-width: 100px;
`;

const OrdersTableRoot = styled.div``;

const OrdersTableContainer = styled.div`
  grid-column: 1 / 3;
  margin-top: 20px;
`;

export default function OrdersTableView() {
  const [status, setStatus] = useState<OrderStatus | null>(null);

  const [page, setPage] = useState(0);

  const ordersQuery = useOrdersQuery(page, status ?? undefined);
  const ordersCountQuery = useOrdersCountQuery();

  const deleteOrderMutation = useDeleteOrderMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogOrder, setDeleteDialogOrder] = useState<OrderDto | null>(null);

  const handleStatusSelectChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const newStatus = e.target.value as OrderStatus | 'Any';
    if (newStatus === 'Any') {
      setStatus(null);
    } else {
      setStatus(newStatus);
    }
  };

  const handleDeleteButton = (order: OrderDto) => {
    setDeleteDialogOrder(order);
    setDeleteDialogOpen(true);
  };

  const handleDeleteOrder = (order: OrderDto) => {
    deleteOrderMutation.mutate(order.id);
    setDeleteDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div>
        <StatusSelectFormControl>
          <InputLabel>Status</InputLabel>
          <Select value={status ?? 'Any'} onChange={handleStatusSelectChange}>
            <MenuItem value={'Any'}>Any</MenuItem>
            <MenuItem value={OrderStatus.New}>New</MenuItem>
            <MenuItem value={OrderStatus.Processing}>Processing</MenuItem>
            <MenuItem value={OrderStatus.Completed}>Completed</MenuItem>
            <MenuItem value={OrderStatus.Cancelled}>Cancelled</MenuItem>
          </Select>
        </StatusSelectFormControl>
      </div>

      <OrdersTableRoot>
        {ordersCountQuery.status === 'success' && ordersQuery.status === 'success' ? (
          <>
            <TablePagination
              component="div"
              count={ordersCountQuery.data}
              onChangePage={(event, page) => setPage(page)}
              page={page}
              rowsPerPage={ITEMS_PER_TABLE_PAGE}
              rowsPerPageOptions={[ITEMS_PER_TABLE_PAGE]}
            ></TablePagination>

            <OrdersTableContainer>
              <OrdersTable orders={ordersQuery.data} onDelete={handleDeleteButton}></OrdersTable>
            </OrdersTableContainer>
          </>
        ) : (
          <div>loading</div>
        )}
      </OrdersTableRoot>

      {deleteDialogOrder && (
        <DeleteOrderConfirmationDialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          order={deleteDialogOrder}
          onConfirm={handleDeleteOrder}
        ></DeleteOrderConfirmationDialog>
      )}
    </>
  );
}
