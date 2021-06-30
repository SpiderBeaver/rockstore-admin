import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  pictureFilename: string | null;
}
interface SelectProductTableProps {
  products: Product[];
  onProductSelect: (productId: number) => void;
}
export default function SelectProductTable({ products, onProductSelect }: SelectProductTableProps) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleRowClick = (productId: number) => {
    setSelectedProductId(productId);
    onProductSelect(productId);
  };

  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              selected={product.id === selectedProductId}
              onClick={() => handleRowClick(product.id)}
            >
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
