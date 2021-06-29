import { Button, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useCreateProductMutation } from '../hooks/useCreateProductMutation';
import ImageUploader from './ImageUploader';

const CardContainer = styled(Paper)`
  padding: 20px;
`;

export default function NewProductCard() {
  const [name, setName] = useState('');
  const [nameInputError, setNameInputError] = useState<string | null>(null);
  const [priceString, setPriceString] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [priceInputError, setPriceInputError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const history = useHistory();

  const createProductMutation = useCreateProductMutation(() => history.push('/products'));

  const handlePriceInputBlur = () => {
    if (priceString.trim().length === 0) {
      setPriceInputError('Please enter price');
      setPrice(null);
      return;
    }

    const parsed = Number(priceString);
    if (isNaN(parsed)) {
      setPriceInputError('Price is in incorrect format');
      setPrice(null);
      return;
    }

    setPrice(parsed);
    console.log(parsed);
    setPriceInputError(null);
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (name === '') {
      setNameInputError("Please enter product's name");
      return;
    }
    setNameInputError(null);

    if (price === null) {
      return;
    }

    createProductMutation.mutate({ name: name, price: price, file: file });

    setName('');
    setFile(null);
  };

  return (
    <CardContainer>
      <h1>New Product</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          required={true}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameInputError !== null}
          helperText={nameInputError}
        ></TextField>
        <TextField
          label="Price ($)"
          required={true}
          variant="outlined"
          value={priceString}
          onChange={(e) => setPriceString(e.target.value)}
          error={priceInputError !== null}
          helperText={priceInputError}
          onBlur={handlePriceInputBlur}
        ></TextField>

        <h2>Picture</h2>
        <ImageUploader onImageSelect={(file) => setFile(file)}></ImageUploader>

        <Button type="submit" variant="contained" color="primary">
          Create new product
        </Button>
      </form>
    </CardContainer>
  );
}
