import { useQuery } from 'react-query';
import { getOrders, GetOrdersParams } from '../api/api';
import { ITEMS_PER_TABLE_PAGE } from '../constants';

export function useOrdersQuery(page: number) {
  const limit = ITEMS_PER_TABLE_PAGE;
  const offset = ITEMS_PER_TABLE_PAGE * page;
  const getProductsParams: GetOrdersParams = { limit: limit, offset: offset };
  const productsQuery = useQuery(['orders', page], () => getOrders(getProductsParams), {
    keepPreviousData: true,
  });
  return productsQuery;
}
