import { useMutation, useQueryClient } from 'react-query';
import { deleteProduct } from '../api/api';

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation(
    async (id: number) => {
      await deleteProduct(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
      },
    }
  );

  return deleteProductMutation;
}
