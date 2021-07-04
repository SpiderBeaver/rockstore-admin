import { useMutation, useQueryClient } from 'react-query';
import { editProduct, productRemovePicture, productUploadPicture } from '../api/api';

export interface EditProductMutationParams {
  id: number;
  name: string;
  sku: string;
  description?: string;
  price: number;
  inStock: number;
  file: File | null | undefined;
}
export function useEditProductMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ id, name, sku, description, price, inStock, file }: EditProductMutationParams) => {
      const product = await editProduct({
        id: id,
        product: { name: name, sku: sku, description: description, price: price, inStock: inStock },
      });

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
