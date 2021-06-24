import { ProductDto } from './dto/ProductDto';

export async function getProducts() {
  const response = await fetch('http://localhost:3001/products');
  const products = (await response.json()) as ProductDto[];
  return products;
}

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
