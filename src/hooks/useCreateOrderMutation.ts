import { useMutation, useQueryClient } from 'react-query';
import { createOrder } from '../api/api';

export interface CreateOrderMutationParams {
  products: {
    id: number;
    count: number;
  }[];
}
export function useCreateOrderMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ products }: CreateOrderMutationParams) => {
      const newOrder = await createOrder({ order: { products: products } });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
        onSuccess?.();
      },
    }
  );

  return mutation;
}
