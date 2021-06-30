import { TablePagination } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { ITEMS_PER_TABLE_PAGE } from '../../constants';
import { useProductsCountQuery } from '../../hooks/useProductsCountQuery';
import { useProductsQuery } from '../../hooks/useProductsQuery';
import SearchField from '../common/SearchField';
import SelectProductTable from './SelectProductTable';

const Root = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
`;

const TableContainer = styled.div`
  grid-column: 1 / 3;
  margin-top: 20px;
`;

interface SelectProductViewProps {
  onProductSelect: (productId: number) => void;
}
export default function SelectProductView({ onProductSelect }: SelectProductViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);

  const productsQuery = useProductsQuery(page, searchQuery);
  const productsCountQuery = useProductsCountQuery();

  return (
    <Root>
      <SearchField onChange={setSearchQuery}></SearchField>
      {productsQuery.status === 'success' && productsCountQuery.status === 'success' && (
        <>
          <TablePagination
            component="div"
            count={productsCountQuery.data}
            onChangePage={(event, page) => setPage(page)}
            page={page}
            rowsPerPage={ITEMS_PER_TABLE_PAGE}
            rowsPerPageOptions={[ITEMS_PER_TABLE_PAGE]}
          ></TablePagination>
          <TableContainer>
            <SelectProductTable products={productsQuery.data} onProductSelect={onProductSelect}></SelectProductTable>
          </TableContainer>
        </>
      )}
    </Root>
  );
}
