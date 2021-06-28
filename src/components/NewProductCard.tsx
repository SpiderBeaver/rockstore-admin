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
  const [file, setFile] = useState<File | null>(null);

  const history = useHistory();

  const createProductMutation = useCreateProductMutation(() => history.push('/products'));

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (name === '') {
      setNameInputError("Please enter product's name");
      return;
    }
    setNameInputError(null);

    createProductMutation.mutate({ newProductName: name, file: file });

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
        <h2>Picture</h2>

        <ImageUploader onImageSelect={(file) => setFile(file)}></ImageUploader>

        <Button type="submit" variant="contained" color="primary">
          Create new product
        </Button>
      </form>
    </CardContainer>
  );
}
