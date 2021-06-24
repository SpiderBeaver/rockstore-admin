import React, { useEffect, useState } from 'react';
import { ProductDto } from '../dto/ProductDto';

export default function ProductsList() {
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3001/products');
      const fetchedProducts = (await response.json()) as ProductDto[];
      setProducts(fetchedProducts);
      console.log(fetchedProducts);
    };
    fetchProducts();
  }, []);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.pictureFilename !== null ? (
            <img src={`http://localhost:3001/uploads/${product.pictureFilename}`} alt={product.name}></img>
          ) : null}
          {product.name}
        </li>
      ))}
    </ul>
  );
}
