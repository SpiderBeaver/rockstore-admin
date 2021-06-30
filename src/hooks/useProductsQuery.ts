import { useQuery } from 'react-query';
import { getProducts, GetProductsParams } from '../api/api';
import { ITEMS_PER_TABLE_PAGE } from '../constants';

export function useProductsQuery(page: number, searchQuery: string) {
  const limit = ITEMS_PER_TABLE_PAGE;
  const offset = ITEMS_PER_TABLE_PAGE * page;
  const getProductsParams: GetProductsParams = { limit: limit, offset: offset, searchQuery: searchQuery };
  const productsQuery = useQuery(['products', searchQuery, page], () => getProducts(getProductsParams), {
    keepPreviousData: true,
  });
  return productsQuery;
}
