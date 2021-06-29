import { Button, Paper, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import * as Yup from 'yup';
import { useCreateProductMutation } from '../hooks/useCreateProductMutation';
import ImageUploader from './ImageUploader';

const CardContainer = styled(Paper)`
  padding: 20px;
`;

interface NewProductFormValues {
  name: string;
  price: string;
}

export default function NewProductCard() {
  const [file, setFile] = useState<File | null>(null);

  const history = useHistory();

  const createProductMutation = useCreateProductMutation(() => history.push('/products'));

  const validationSchema: Yup.SchemaOf<NewProductFormValues> = Yup.object({
    name: Yup.string().required('Required'),
    price: Yup.string()
      .required('Required')
      .matches(/^\d+(\..+)?$/, 'Wrong format'),
  });

  const formik = useFormik<NewProductFormValues>({
    initialValues: {
      name: '',
      price: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const priceParsed = parseFloat(values.price);
      createProductMutation.mutate({ name: values.name, price: priceParsed, file: file });
    },
  });

  return (
    <CardContainer>
      <h1>New Product</h1>

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
        <ImageUploader onImageSelect={(file) => setFile(file)}></ImageUploader>

        <Button type="submit" variant="contained" color="primary">
          Create new product
        </Button>
      </form>
    </CardContainer>
  );
}
