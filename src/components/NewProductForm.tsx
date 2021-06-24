import React, { useState } from 'react';

export default function NewProductForm() {
  const [name, setName] = useState('');

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    if (name.length === 0) {
      return;
    }

    const result = await fetch('http://localhost:3001/products', {
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

    if (result.ok) {
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
      <input type="submit" value="New Product"></input>
    </form>
  );
}
