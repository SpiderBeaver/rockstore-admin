import { TableContainer, TablePagination } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { ProductDto } from '../../api/dto/ProductDto';
import { ITEMS_PER_TABLE_PAGE } from '../../constants';
import { useDeleteProductMutation } from '../../hooks/useDeleteProductMutation';
import { useProductsCountQuery } from '../../hooks/useProductsCountQuery';
import { useProductsQuery } from '../../hooks/useProductsQuery';
import SearchField from '../common/SearchField';
import DeleteProductConfirmationDialog from './DeleteProductConfirmationDialog';
import ProductsTable from './ProductsTable';

const ProductsTableRoot = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto auto;
`;

const ProductsTableContainer = styled(TableContainer)`
  grid-column: 1 / 3;
  margin-top: 20px;
`;

export default function ProductsTableView() {
  const [searchQuery, setSearchQuery] = useState('');

  const [page, setPage] = useState(0);

  const productsQuery = useProductsQuery(page, searchQuery);
  const productsCountQuery = useProductsCountQuery();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogProduct, setDeleteDialogProduct] = useState<ProductDto | null>(null);

  const handleDeleteButton = (product: ProductDto) => {
    setDeleteDialogProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const deleteProductMutation = useDeleteProductMutation();

  const handleDeleteProduct = (product: ProductDto) => {
    deleteProductMutation.mutate(product.id);
    setDeleteDialogOpen(false);
  };

  return (
    <ProductsTableRoot>
      <SearchField onChange={setSearchQuery}></SearchField>

      {productsCountQuery.status === 'success' && productsQuery.status === 'success' ? (
        <>
          <TablePagination
            component="div"
            count={productsCountQuery.data}
            onChangePage={(event, page) => setPage(page)}
            page={page}
            rowsPerPage={ITEMS_PER_TABLE_PAGE}
            rowsPerPageOptions={[ITEMS_PER_TABLE_PAGE]}
          ></TablePagination>

          <ProductsTableContainer>
            <ProductsTable products={productsQuery.data} onDelete={handleDeleteButton}></ProductsTable>
          </ProductsTableContainer>
        </>
      ) : (
        <div>loading</div>
      )}

      {deleteDialogProduct && (
        <DeleteProductConfirmationDialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          product={deleteDialogProduct}
          onConfirm={handleDeleteProduct}
        ></DeleteProductConfirmationDialog>
      )}
    </ProductsTableRoot>
  );
}
