import { Button, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { editProduct, getProduct, productUploadPicture } from '../api/api';

const CardContainer = styled(Paper)`
  padding: 20px;
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

const UploadButton = styled.label`
  display: block;
  margin-bottom: 50px;
`;

const HiddenInput = styled.input`
  visibility: hidden;
`;

export default function EditProductCard() {
  const { productId: productIdString } = useParams<{ productId: string }>();
  const productId = parseInt(productIdString);

  const product = useQuery(['product', productId], () => getProduct(productId));

  const history = useHistory();

  const [name, setName] = useState('');
  const [nameInputError, setNameInputError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pictureDataUrl, setPictureDataUrl] = useState('');

  useEffect(() => {
    console.log('ehehe');
    if (product.status === 'success') {
      setName(product.data!.name);
    }
  }, [product.status, product.data]);

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
      const product = await editProduct({ id: productId, product: { name: name } });

      if (product != null && file != null) {
        await productUploadPicture({
          productId: product.id,
          file: file,
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        console.log('hi');
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
      {product.status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Edit Product {product.data?.name}</h1>
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
              {pictureDataUrl !== '' ? (
                <Picture src={pictureDataUrl}></Picture>
              ) : product.data?.pictureFilename !== null ? (
                <Picture src={`http://localhost:3001/uploads/${product.data?.pictureFilename}`}></Picture>
              ) : (
                <Picture src=""></Picture>
              )}
            </PictureContainer>

            <UploadButton>
              <Button variant="contained" color="default" component="span">
                Upload
              </Button>
              <HiddenInput
                type="file"
                name="picture"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              ></HiddenInput>
            </UploadButton>

            <Button type="submit" variant="contained" color="primary">
              Save changes
            </Button>
          </form>
        </>
      )}
    </CardContainer>
  );
}
