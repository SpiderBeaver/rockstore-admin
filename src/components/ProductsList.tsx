import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
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

interface Props {
  page?: number;
}

export default function ProductsList({ page }: Props) {
  const limit = productsPerPage;
  const offset = page !== undefined ? productsPerPage * (page - 1) : 0;
  const productsQuery = useQuery(['products', page], () => getProducts(limit, offset));

  return (
    <>
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
    </>
  );
}
