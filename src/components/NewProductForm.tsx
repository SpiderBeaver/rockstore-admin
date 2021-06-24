import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createProduct, productUploadPicture } from '../api/api';
import { ProductDto } from '../api/dto/ProductDto';

export default function NewProductForm() {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);

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
      },
    }
  );

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    if (name.length === 0) {
      return;
    }

    mutation.mutate({ newProductName: name, file: file });

    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
      <input type="file" name="picture" onChange={(e) => setFile(e.target.files?.[0] || null)}></input>
      <input type="submit" value="New Product"></input>
    </form>
  );
}
