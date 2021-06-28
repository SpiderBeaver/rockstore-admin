import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components/macro';
import { deleteProduct, getProducts, getProductsCount, GetProductsParams } from '../api/api';
import { Link } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

const ProductsTableRoot = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto auto;
`;

const ProductsTableContainer = styled(TableContainer)`
  grid-column: 1 / 3;
  margin-top: 20px;
`;

const ProductImage = styled.img`
  max-height: 30px;
`;

const LowPaddingTableCell = styled(TableCell)`
  padding: 8px;
`;

const productsPerPage = 10;

export default function ProductsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchQueryDebounced = useDebounce(searchQuery);

  const [page, setPage] = useState(0);

  const limit = productsPerPage;
  const offset = productsPerPage * page;
  const getProductsParams: GetProductsParams = { limit: limit, offset: offset, searchQuery: searchQueryDebounced };
  const productsQuery = useQuery(['products', searchQueryDebounced, page], () => getProducts(getProductsParams), {
    keepPreviousData: true,
  });

  const productsCountQuery = useQuery(['products', 'count'], getProductsCount);

  const handlePageChange = (event: React.MouseEvent | null, page: number) => {
    setPage(page);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogProductId, setDeleteDialogProductId] = useState(0);

  const handleDeleteButton = (productId: number) => {
    setDeleteDialogProductId(productId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation(
    async (id: number) => {
      await deleteProduct(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
      },
    }
  );

  const handleDeleteProduct = (productId: number) => {
    deleteProductMutation.mutate(productId);
    setDeleteDialogOpen(false);
  };

  return (
    <ProductsTableRoot>
      <TextField label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></TextField>
      {productsCountQuery.status === 'success' ? (
        <TablePagination
          component="div"
          count={productsCountQuery.data}
          onChangePage={handlePageChange}
          page={page}
          rowsPerPage={productsPerPage}
          rowsPerPageOptions={[productsPerPage]}
        ></TablePagination>
      ) : (
        <div></div>
      )}
      <ProductsTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Picture</TableCell>
              <TableCell>In Stock</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsQuery.data?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <LowPaddingTableCell>
                  {product.pictureFilename !== null ? (
                    <ProductImage
                      src={`http://localhost:3001/uploads/${product.pictureFilename}`}
                      alt={product.name}
                    ></ProductImage>
                  ) : null}
                </LowPaddingTableCell>
                <TableCell>12</TableCell>
                <TableCell>
                  <Link to={`/products/${product.id}/edit`}>
                    <Button size="small">Edit</Button>
                  </Link>
                  <Button size="small" color="secondary" onClick={() => handleDeleteButton(product.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ProductsTableContainer>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete product [
            {productsQuery.data?.find((product) => product.id === deleteDialogProductId)?.name}]
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => handleDeleteProduct(deleteDialogProductId)}>
            Delete
          </Button>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </ProductsTableRoot>
  );
}
