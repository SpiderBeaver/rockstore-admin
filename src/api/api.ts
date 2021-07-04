import axios from 'axios';
import { OrderDto } from './dto/OrderDto';
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

export interface CreateProductParams {
  product: {
    name: string;
    sku: string;
    description?: string;
    price: number;
  };
}
// TODO: Move all funcitons to axios
export async function createProduct({ product }: CreateProductParams) {
  const response = await fetch('http://localhost:3001/products', {
    method: 'POST',
    body: JSON.stringify({
      product: {
        name: product.name,
        sku: product.sku,
        description: product.description,
        price: product.price,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });
  const newProduct = (await response.json()) as ProductDto;
  return newProduct;
}

interface EditProductParams {
  id: number;
  product: {
    name?: string;
    sku?: string;
    description?: string;
    price?: number;
  };
}
export async function editProduct({ id, product }: EditProductParams) {
  const response = await axios.post<ProductDto>(`http://localhost:3001/products/${id}/edit`, {
    product: {
      name: product.name,
      sku: product.sku,
      description: product.description,
      price: product.price,
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

export async function productRemovePicture(productId: number) {
  const url = `http://localhost:3001/products/${productId}/picture/delete`;
  const response = await axios.post<ProductDto>(url);
  if (response.status === 201) {
    return response.data;
  } else if (response.status === 404) {
    return null;
  } else {
    // TODO: throw error
    return null;
  }
}

export interface GetOrdersParams {
  limit?: number;
  offset?: number;
}
export async function getOrders({ limit, offset }: GetOrdersParams) {
  const response = await axios.get<OrderDto[]>('http://localhost:3001/orders', {
    params: { limit: limit, offset: offset },
  });
  return response.data;
}

export async function getOrdersCount() {
  const response = await axios.get<{ count: number }>('http://localhost:3001/orders/count');
  return response.data.count;
}

export async function deleteOrder(id: number) {
  const response = await axios.post(`http://localhost:3001/orders/${id}/delete`);
  if (response.status === 201) {
    return;
  } else if (response.status === 404) {
    throw new Error('Order not found.');
  } else {
    // TODO: throw error
  }
}

export interface CreateOrderParams {
  order: {
    products: {
      id: number;
      count: number;
    }[];
  };
}
export async function createOrder(params: CreateOrderParams) {
  const order = await axios.post<OrderDto>('http://localhost:3001/orders', params.order);
  return order;
}
