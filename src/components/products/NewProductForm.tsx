import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import ImageUploader from '../ImageUploader';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Form = styled.form`
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: auto auto;
`;

const BasicFields = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

const ProductTextField = styled(TextField)`
  min-height: 6em;
`;

const ImageUploaderContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  padding-left: 5em;
`;

const ButtonsContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
`;

const SubmitButton = styled(Button)``;

interface NewProductFormBasicValues {
  name: string;
  sku: string;
  description: string | undefined;
  price: string;
  inStock: string;
}

export type NewProductFormValues = NewProductFormBasicValues & { file: File | null };

export interface NewProductFormProps {
  onSubmit: (values: NewProductFormValues) => void;
}

export default function NewProductForm({ onSubmit }: NewProductFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const validationSchema: Yup.SchemaOf<NewProductFormBasicValues> = Yup.object({
    name: Yup.string().required('Required'),
    sku: Yup.string().required('Required'),
    description: Yup.string(),
    price: Yup.string()
      .required('Required')
      .matches(/^\d+(\.d+)?$/, 'Wrong format'),
    inStock: Yup.string().required('Required').matches(/^\d+$/, 'Wrong format'),
  });

  const formik = useFormik<NewProductFormBasicValues>({
    initialValues: {
      name: '',
      sku: '',
      description: undefined,
      price: '',
      inStock: '1',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, file: file });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <BasicFields>
        <h3>Product Information</h3>
        <ProductTextField
          label="Name"
          variant="outlined"
          {...formik.getFieldProps('name')}
          error={formik.errors.name !== undefined && formik.touched.name}
          helperText={formik.errors.name}
        ></ProductTextField>
        <ProductTextField
          label="SKU"
          variant="outlined"
          {...formik.getFieldProps('sku')}
          error={formik.errors.sku !== undefined && formik.touched.sku}
          helperText={formik.errors.sku}
        ></ProductTextField>
        <ProductTextField
          label="Description"
          variant="outlined"
          {...formik.getFieldProps('description')}
          error={formik.errors.description !== undefined && formik.touched.description}
          helperText={formik.errors.description}
        ></ProductTextField>
        <ProductTextField
          label="Price ($)"
          variant="outlined"
          {...formik.getFieldProps('price')}
          error={formik.errors.price !== undefined && formik.touched.price}
          helperText={formik.errors.price}
        ></ProductTextField>
        <ProductTextField
          label="In Stock"
          variant="outlined"
          {...formik.getFieldProps('inStock')}
          error={formik.errors.inStock !== undefined && formik.touched.inStock}
          helperText={formik.errors.inStock}
        ></ProductTextField>
      </BasicFields>

      <ImageUploaderContainer>
        <h3>Picture</h3>
        <ImageUploader onImageSelect={(file) => setFile(file)}></ImageUploader>
      </ImageUploaderContainer>

      <ButtonsContainer>
        <SubmitButton type="submit" variant="contained" color="primary">
          Create new product
        </SubmitButton>
      </ButtonsContainer>
    </Form>
  );
}
