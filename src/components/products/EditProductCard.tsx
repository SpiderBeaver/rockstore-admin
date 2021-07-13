import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getProduct } from '../../api/api';
import { useEditProductMutation } from '../../hooks/useEditProductMutation';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import ImageUploader from '../ImageUploader';

interface EditProductFormValues {
  name: string;
  sku: string;
  description?: string;
  price: string;
  inStock: string;
}

const validationSchema: Yup.SchemaOf<EditProductFormValues> = Yup.object({
  name: Yup.string().required('Required'),
  sku: Yup.string().required('Required'),
  description: Yup.string(),
  price: Yup.string()
    .required('Required')
    .matches(/^\d+(\.\d+)?$/, 'Wrong format'),
  inStock: Yup.string().required('Required').matches(/^\d+$/, 'Wrong format'),
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
      sku: product.data?.sku ?? '',
      description: product.data?.description ?? '',
      price: product.data?.price.toFixed(2) ?? '',
      inStock: product.data?.inStock.toString() ?? '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const priceParsed = parseFloat(values.price);
      const inStockParsed = parseInt(values.inStock);
      editProductMutation.mutate({
        id: productId,
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
    <Section>
      {product.status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <>
          <SectionHeading>Edit Product</SectionHeading>

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
              label="Descriptioin"
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

            <h3>Picture</h3>
            <ImageUploader
              onImageSelect={(file) => setFile(file)}
              initialImageFilename={product.data?.pictureFilename ?? undefined}
            ></ImageUploader>

            <Button type="submit" variant="contained" color="primary">
              Update product
            </Button>
          </form>
        </>
      )}
    </Section>
  );
}
