import { useMutation, useQueryClient } from 'react-query';
import { deleteOrder } from '../api/api';

export function useDeleteOrderMutation() {
  const queryClient = useQueryClient();

  const deleteOrderMutation = useMutation(
    async (id: number) => {
      await deleteOrder(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
      },
    }
  );

  return deleteOrderMutation;
}
