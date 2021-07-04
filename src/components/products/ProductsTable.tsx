import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
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
  onDelete: (product: ProductDto) => void;
}
export default function ProductsTable({ products, onDelete }: ProductsTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Picture</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>In Stock</TableCell>
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
