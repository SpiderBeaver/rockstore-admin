import axios from 'axios';
import { ProductDto } from './dto/ProductDto';

export async function getProductsCount() {
  const response = await axios.get<{ count: number }>('http://localhost:3001/products/count');
  return response.data.count;
}

export interface GetProductsParams {
  limit?: number;
  offset?: number;
  searchQuery?: string;
}
export async function getProducts({ limit, offset, searchQuery }: GetProductsParams) {
  const response = await axios.get<ProductDto[]>('http://localhost:3001/products', {
    params: { limit: limit, offset: offset, query: searchQuery },
  });
  return response.data;
}

export async function getProduct(id: number) {
  const response = await axios.get<ProductDto>(`http://localhost:3001/products/${id}`);
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 404) {
    return null;
  } else {
    // TODO: throw error
  }
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

interface EditProductParams {
  id: number;
  product: {
    name?: string;
  };
}
export async function editProduct({ id, product }: EditProductParams) {
  const response = await axios.post<ProductDto>(`http://localhost:3001/products/${id}/edit`, {
    product: {
      name: product.name,
    },
  });
  if (response.status === 201) {
    return response.data;
  } else if (response.status === 404) {
    return null;
  } else {
    // TODO: throw error
  }
}

export async function deleteProduct(id: number) {
  const response = await axios.post<ProductDto>(`http://localhost:3001/products/${id}/delete`);
  if (response.status === 201) {
    return response.data;
  } else if (response.status === 404) {
    return null;
  } else {
    // TODO: throw error
  }
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
