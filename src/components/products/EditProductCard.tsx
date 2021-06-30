import { Button, Paper, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import * as Yup from 'yup';
import { getProduct } from '../../api/api';
import { useEditProductMutation } from '../../hooks/useEditProductMutation';
import ImageUploader from '../ImageUploader';

const CardContainer = styled(Paper)`
  padding: 20px;
`;

interface EditProductFormValues {
  name: string;
  price: string;
}

const validationSchema: Yup.SchemaOf<EditProductFormValues> = Yup.object({
  name: Yup.string().required('Required'),
  price: Yup.string()
    .required('Required')
    .matches(/^\d+(\.\d+)?$/, 'Wrong format'),
});

export default function EditProductCard() {
  const { productId: productIdString } = useParams<{ productId: string }>();
  const productId = parseInt(productIdString);

  const product = useQuery(['product', productId], () => getProduct(productId));

  const history = useHistory();

  // File is undefined at first and becomes File or null when an image is selected or deleted.
  // This is used when we decide whether to delete an existing product picture.
  const [file, setFile] = useState<File | null | undefined>(undefined);

  const editProductMutation = useEditProductMutation(() => history.push('/products'));

  const formik = useFormik<EditProductFormValues>({
    initialValues: {
      name: product.data?.name ?? '',
      price: product.data?.price.toFixed(2) ?? '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const priceParsed = parseFloat(values.price);
      editProductMutation.mutate({ id: productId, name: values.name, price: priceParsed, file: file });
    },
  });

  return (
    <CardContainer>
      {product.status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Edit Product</h1>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              {...formik.getFieldProps('name')}
              error={formik.errors.name !== undefined && formik.touched.name}
              helperText={formik.errors.name}
            ></TextField>
            <TextField
              label="Price ($)"
              variant="outlined"
              {...formik.getFieldProps('price')}
              error={formik.errors.price !== undefined && formik.touched.price}
              helperText={formik.errors.price}
            ></TextField>

            <h2>Picture</h2>
            <ImageUploader
              onImageSelect={(file) => setFile(file)}
              initialImageFilename={product.data?.pictureFilename}
            ></ImageUploader>

            <Button type="submit" variant="contained" color="primary">
              Update product
            </Button>
          </form>
        </>
      )}
    </CardContainer>
  );
}
