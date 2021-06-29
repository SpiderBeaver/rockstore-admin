import { Button, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { getProduct } from '../api/api';
import { useEditProductMutation } from '../hooks/useEditProductMutation';
import ImageUploader from './ImageUploader';

const CardContainer = styled(Paper)`
  padding: 20px;
`;

export default function EditProductCard() {
  const { productId: productIdString } = useParams<{ productId: string }>();
  const productId = parseInt(productIdString);

  const product = useQuery(['product', productId], () => getProduct(productId));

  const history = useHistory();

  const [name, setName] = useState('');
  const [nameInputError, setNameInputError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (product.status === 'success') {
      setName(product.data!.name);
    }
  }, [product.status, product.data]);

  const editProductMutation = useEditProductMutation(() => history.push('/products'));

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (name === '') {
      setNameInputError("Please enter product's name");
      return;
    }
    setNameInputError(null);

    editProductMutation.mutate({ id: productId, name: name, file: file });

    setName('');
    setFile(null);
  };

  return (
    <CardContainer>
      {product.status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Edit Product {name}</h1>
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

            <ImageUploader
              onImageSelect={(file) => setFile(file)}
              initialImageFilename={product.data?.pictureFilename}
            ></ImageUploader>

            <Button type="submit" variant="contained" color="primary">
              Save changes
            </Button>
          </form>
        </>
      )}
    </CardContainer>
  );
}
