import { useMutation, useQueryClient } from 'react-query';
import { createOrder, CreateOrderParams } from '../api/api';

export function useCreateOrderMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (params: CreateOrderParams) => {
      const newOrder = await createOrder(params);
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
