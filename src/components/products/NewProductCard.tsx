import { Button, Paper, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import * as Yup from 'yup';
import { useCreateProductMutation } from '../../hooks/useCreateProductMutation';
import ImageUploader from '../ImageUploader';

const CardContainer = styled(Paper)`
  padding: 20px;
`;

interface NewProductFormValues {
  name: string;
  sku: string;
  description: string | undefined;
  price: string;
  inStock: string;
}

export default function NewProductCard() {
  const [file, setFile] = useState<File | null>(null);

  const history = useHistory();

  const createProductMutation = useCreateProductMutation(() => history.push('/products'));

  const validationSchema: Yup.SchemaOf<NewProductFormValues> = Yup.object({
    name: Yup.string().required('Required'),
    sku: Yup.string().required('Required'),
    description: Yup.string(),
    price: Yup.string()
      .required('Required')
      .matches(/^\d+(\.d+)?$/, 'Wrong format'),
    inStock: Yup.string().required('Required').matches(/^\d+$/, 'Wrong format'),
  });

  const formik = useFormik<NewProductFormValues>({
    initialValues: {
      name: '',
      sku: '',
      description: undefined,
      price: '',
      inStock: '1',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const priceParsed = parseFloat(values.price);
      const inStockParsed = parseInt(values.inStock);
      createProductMutation.mutate({
        name: values.name,
        sku: values.sku,
        description: values.description,
        price: priceParsed,
        inStock: inStockParsed,
        file: file,
      });
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
          label="SKU"
          variant="outlined"
          {...formik.getFieldProps('sku')}
          error={formik.errors.sku !== undefined && formik.touched.sku}
          helperText={formik.errors.sku}
        ></TextField>
        <TextField
          label="Description"
          variant="outlined"
          {...formik.getFieldProps('description')}
          error={formik.errors.description !== undefined && formik.touched.description}
          helperText={formik.errors.description}
        ></TextField>
        <TextField
          label="Price ($)"
          variant="outlined"
          {...formik.getFieldProps('price')}
          error={formik.errors.price !== undefined && formik.touched.price}
          helperText={formik.errors.price}
        ></TextField>
        <TextField
          label="In Stock"
          variant="outlined"
          {...formik.getFieldProps('inStock')}
          error={formik.errors.inStock !== undefined && formik.touched.inStock}
          helperText={formik.errors.inStock}
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
