import { useMutation, useQueryClient } from 'react-query';
import { editProduct, productUploadPicture } from '../api/api';

export function useEditProductMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ id, name, file }: { id: number; name: string; file: File | null }) => {
      const product = await editProduct({ id: id, product: { name: name } });

      if (product != null && file != null) {
        await productUploadPicture({
          productId: product.id,
          file: file,
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        onSuccess?.();
      },
    }
  );

  return mutation;
}
