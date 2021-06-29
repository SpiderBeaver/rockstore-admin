import { useMutation, useQueryClient } from 'react-query';
import { editProduct, productRemovePicture, productUploadPicture } from '../api/api';

export function useEditProductMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ id, name, price, file }: { id: number; name: string; price: number; file: File | null | undefined }) => {
      const product = await editProduct({ id: id, product: { name: name, price: price } });

      if (product != null) {
        if (file !== null && file !== undefined) {
          await productUploadPicture({
            productId: product.id,
            file: file,
          });
        } else if (file === null) {
          await productRemovePicture(id);
        }
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
