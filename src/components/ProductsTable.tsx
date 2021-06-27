import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/macro';
import { getProducts } from '../api/api';

const ProductImage = styled.img`
  max-height: 30px;
`;

const LowPaddingTableCell = styled(TableCell)`
  padding: 8px;
`;

const productsPerPage = 10;

export default function ProductsTable() {
  const [page, setPage] = useState(0);

  const limit = productsPerPage;
  const offset = productsPerPage * page;
  const productsQuery = useQuery(['products', page], () => getProducts(limit, offset), { keepPreviousData: true });

  const handlePageChange = (event: React.MouseEvent | null, page: number) => {
    setPage(page);
  };

  return (
    <>
      <TablePagination
        component="div"
        count={120}
        onChangePage={handlePageChange}
        page={page}
        rowsPerPage={productsPerPage}
        rowsPerPageOptions={[productsPerPage]}
      ></TablePagination>
      <TableContainer>
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
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
