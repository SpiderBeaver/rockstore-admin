import { useMutation, useQueryClient } from 'react-query';
import { createProduct, productUploadPicture } from '../api/api';

export interface CreateProductMutationParams {
  name: string;
  price: number;
  file: File | null;
}
export function useCreateProductMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ name, price, file }: CreateProductMutationParams) => {
      const newProduct = await createProduct({ product: { name: name, price: price } });

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
