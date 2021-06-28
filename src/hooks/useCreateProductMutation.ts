import { useMutation, useQueryClient } from 'react-query';
import { createProduct, productUploadPicture } from '../api/api';

export function useCreateProductMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ newProductName, file }: { newProductName: string; file: File | null }) => {
      const newProduct = await createProduct({ name: newProductName });

      if (file !== null) {
        await productUploadPicture({
          productId: newProduct.id,
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
