import { useQuery } from 'react-query';
import { getOrdersCount } from '../api/api';

export function useOrdersCountQuery() {
  const ordersCountQuery = useQuery(['orders', 'count'], getOrdersCount);
  return ordersCountQuery;
}
