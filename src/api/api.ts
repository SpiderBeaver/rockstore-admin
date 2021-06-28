import axios from 'axios';
import { ProductDto } from './dto/ProductDto';

export async function getProducts(limit: number | undefined = undefined, offset: number | undefined = undefined) {
  const response = await axios.get<ProductDto[]>('http://localhost:3001/products', {
    params: { limit: limit, offset: offset },
  });
  return response.data;
}

export async function getProductsCount() {
  const response = await axios.get<{ count: number }>('http://localhost:3001/products/count');
  return response.data.count;
}

// TODO: Move all funcitons to axios
export async function createProduct({ name }: { name: string }) {
  const response = await fetch('http://localhost:3001/products', {
    method: 'POST',
    body: JSON.stringify({
      product: {
        name: name,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });
  const product = (await response.json()) as ProductDto;
  return product;
}

export async function productUploadPicture({ productId, file }: { productId: number; file: File }) {
  const formData = new FormData();
  formData.append('file', file as Blob);

  const uploadUrl = `http://localhost:3001/products/${productId}/picture`;
  const uploadResponse = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });
  const uploadResponseData = await uploadResponse.json();
  return uploadResponseData;
}
