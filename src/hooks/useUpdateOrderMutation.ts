import { useMutation, useQueryClient } from 'react-query';
import { updateOrder, UpdateOrderParams } from '../api/api';

export function useUpdateOrderMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (params: UpdateOrderParams) => {
      const order = await updateOrder(params);
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
