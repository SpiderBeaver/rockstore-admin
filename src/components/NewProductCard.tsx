import { Button, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { createProduct, productUploadPicture } from '../api/api';

const CardContainer = styled(Paper)`
  padding: 20px;
`;

const UploadButton = styled.label`
  display: block;
  margin-bottom: 50px;
`;

const HiddenInput = styled.input`
  visibility: hidden;
`;

const PictureContainer = styled.div`
  width: 400px;
  height: 400px;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  margin-bottom: 20px;
`;

const Picture = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export default function NewProductCard() {
  const [name, setName] = useState('');
  const [nameInputError, setNameInputError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pictureDataUrl, setPictureDataUrl] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (file !== null) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        if (data) {
          setPictureDataUrl(data as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPictureDataUrl('');
    }
  }, [file]);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ newProductName, file }: { newProductName: string; file: File | null }) => {
      const newProduct = await createProduct({ name: newProductName });

      if (file !== null) {
        await productUploadPicture({
          productId: newProduct.id,
          file: file,
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        history.push('/products');
      },
    }
  );

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (name === '') {
      setNameInputError("Please enter product's name");
      return;
    }
    setNameInputError(null);

    mutation.mutate({ newProductName: name, file: file });

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
        <PictureContainer>
          <Picture src={pictureDataUrl}></Picture>
        </PictureContainer>

        <UploadButton>
          <Button variant="contained" color="default" component="span">
            Upload
          </Button>
          <HiddenInput type="file" name="picture" onChange={(e) => setFile(e.target.files?.[0] || null)}></HiddenInput>
        </UploadButton>

        <Button type="submit" variant="contained" color="primary">
          Create new product
        </Button>
      </form>
    </CardContainer>
  );
}
