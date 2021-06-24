import React, { useState } from 'react';
import { ProductDto } from '../dto/ProductDto';

export default function NewProductForm() {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    if (name.length === 0) {
      return;
    }

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
    const newProduct = (await response.json()) as ProductDto;

    const formData = new FormData();
    formData.append('file', file as Blob);

    const uploadUrl = `http://localhost:3001/products/${newProduct.id}/picture`;
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });
    const uploadResponseData = await uploadResponse.json();
    console.log(uploadResponseData);
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
