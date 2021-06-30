import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export interface DataTableProps<DataType> {
  items: DataType[];
  columns: { name: string; data: (item: DataType) => React.ReactNode }[];
}
export default function DataTable<DataType extends { id: number }>({ items, columns }: DataTableProps<DataType>) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(({ name }) => (
              <TableCell>{name}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              {columns.map(({ data }) => (
                <TableCell>{data(item)}</TableCell>
              ))}
              <TableCell>
                <Link to={`/products/${item.id}/edit`}>
                  <Button size="small">Edit</Button>
                </Link>
                <Button size="small" color="secondary" onClick={() => {}}>
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
