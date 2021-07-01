import { TablePagination } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { OrderDto } from '../../api/dto/OrderDto';
import { ITEMS_PER_TABLE_PAGE } from '../../constants';
import { useDeleteOrderMutation } from '../../hooks/useDeleteOrderMutation';
import { useOrdersCountQuery } from '../../hooks/useOrdersCountQuery';
import { useOrdersQuery } from '../../hooks/useOrdersQuery';
import DeleteOrderConfirmationDialog from './DeleteOrderConfirmationDialog';
import OrdersTable from './OrdersTable';

const OrdersTableRoot = styled.div``;

const OrdersTableContainer = styled.div`
  grid-column: 1 / 3;
  margin-top: 20px;
`;

export default function OrdersTableView() {
  const [page, setPage] = useState(0);

  const ordersQuery = useOrdersQuery(page);
  const ordersCountQuery = useOrdersCountQuery();

  const deleteOrderMutation = useDeleteOrderMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogOrder, setDeleteDialogOrder] = useState<OrderDto | null>(null);

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
