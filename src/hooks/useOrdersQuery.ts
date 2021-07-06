import { useQuery } from 'react-query';
import { getOrders, GetOrdersParams } from '../api/api';
import { OrderStatus } from '../api/dto/OrderDto';
import { ITEMS_PER_TABLE_PAGE } from '../constants';

export function useOrdersQuery(page: number, status?: OrderStatus) {
  const limit = ITEMS_PER_TABLE_PAGE;
  const offset = ITEMS_PER_TABLE_PAGE * page;
  const getProductsParams: GetOrdersParams = { limit: limit, offset: offset, status: status };
  const productsQuery = useQuery(['orders', status, page], () => getOrders(getProductsParams), {
    keepPreviousData: true,
  });
  return productsQuery;
}
