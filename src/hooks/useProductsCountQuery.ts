import { useQuery } from 'react-query';
import { getProductsCount } from '../api/api';

export function useProductsCountQuery() {
  const productsCountQuery = useQuery(['products', 'count'], getProductsCount);
  return productsCountQuery;
}
