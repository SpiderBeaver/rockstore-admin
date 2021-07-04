import { useQuery } from 'react-query';
import { getProducts, GetProductsParams, ProductSortField, SortOrder } from '../api/api';
import { ITEMS_PER_TABLE_PAGE } from '../constants';

export function useProductsQuery(
  page: number,
  searchQuery?: string,
  sortField?: ProductSortField,
  sortOrder?: SortOrder
) {
  const limit = ITEMS_PER_TABLE_PAGE;
  const offset = ITEMS_PER_TABLE_PAGE * page;
  const getProductsParams: GetProductsParams = {
    limit: limit,
    offset: offset,
    searchQuery: searchQuery,
    sortField: sortField,
    sortOrder: sortOrder,
  };
  const productsQuery = useQuery(
    ['products', searchQuery, page, sortField, sortOrder],
    () => getProducts(getProductsParams),
    {
      keepPreviousData: true,
    }
  );
  return productsQuery;
}
