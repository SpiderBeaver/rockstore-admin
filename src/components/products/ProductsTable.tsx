import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ProductSortField, SortOrder } from '../../api/api';
import { ProductDto } from '../../api/dto/ProductDto';

const ProductName = styled(Link)`
  text-decoration: none;
  color: #000000;
  &:hover {
    font-weight: 500;
  }
`;

const LowPaddingTableCell = styled(TableCell)`
  padding: 8px;
`;

const ProductImage = styled.img`
  max-height: 30px;
`;

export interface ProductsTableProps {
  products: ProductDto[];
  sortingColumn: ProductSortField;
  sortingOrder: SortOrder;
  onSortChange: (column: ProductSortField) => void;
  onDelete: (product: ProductDto) => void;
}
export default function ProductsTable({
  products,
  sortingColumn,
  sortingOrder,
  onSortChange,
  onDelete,
}: ProductsTableProps) {
  const TableSortableHeaderCell = ({ column, children }: { column: ProductSortField; children: React.ReactNode }) => (
    <TableCell sortDirection={sortingColumn === column ? sortingOrder : false}>
      <TableSortLabel
        active={sortingColumn === column}
        direction={sortingColumn === column ? sortingOrder : 'asc'}
        onClick={() => onSortChange(column)}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableSortableHeaderCell column="sku">SKU</TableSortableHeaderCell>
            <TableSortableHeaderCell column="name">Name</TableSortableHeaderCell>
            <TableCell>Picture</TableCell>
            <TableSortableHeaderCell column="price">Price</TableSortableHeaderCell>
            <TableSortableHeaderCell column="inStock">In Stock</TableSortableHeaderCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.sku}</TableCell>
              <TableCell>
                <ProductName to={`/products/${product.id}/edit`}>{product.name}</ProductName>
              </TableCell>
              <LowPaddingTableCell>
                {product.pictureFilename !== null ? (
                  <ProductImage
                    src={`http://localhost:3001/uploads/${product.pictureFilename}`}
                    alt={product.name}
                  ></ProductImage>
                ) : null}
              </LowPaddingTableCell>
              <TableCell>{product.price.toFixed(2)}</TableCell>
              <TableCell>{product.inStock}</TableCell>
              <TableCell>
                <Link to={`/products/${product.id}/edit`}>
                  <Button size="small">Edit</Button>
                </Link>
                <Button size="small" color="secondary" onClick={() => onDelete(product)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
