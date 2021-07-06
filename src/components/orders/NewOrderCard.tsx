import { Button, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useQueries, UseQueryResult } from 'react-query';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { getProduct } from '../../api/api';
import { ProductDto } from '../../api/dto/ProductDto';
import { useCreateOrderMutation } from '../../hooks/useCreateOrderMutation';
import OrderProductsTable from './OrderProductsTable';
import SelectProductDialog from './SelectProductDialog';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const CardContainer = styled(Paper)`
  padding: 20px;
`;

interface OrderProduct {
  id: number;
  count: number;
}

interface NewOrderFormValues {
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientPhone: string;
}

export default function NewOrderCard() {
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);
  const [selectProductDialogOpen, setSelectProductDialogOpen] = useState(false);

  const history = useHistory();
  // TODO: Try .mutateAsync instead on onSuccess callbacks.
  const createOrderMutation = useCreateOrderMutation(() => history.push('/orders'));

  const handleSelectProduct = (productId: number) => {
    setOrderProducts((state) =>
      !state.some((product) => product.id === productId) ? [{ id: productId, count: 1 }, ...state] : state
    );
  };

  const handleProductCountChange = (productId: number, count: number) => {
    setOrderProducts((state) => {
      const productIndex = state.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        const product = state[productIndex];
        const newProduct = { ...product, count: count };
        const newState = [...state];
        newState[productIndex] = newProduct;
        return newState;
      }
      return state;
    });
  };

  const productQueries = useQueries(
    orderProducts.map((product) => ({
      queryKey: ['product', product.id],
      queryFn: async () => await getProduct(product.id),
    }))
  ) as UseQueryResult<ProductDto>[];

  /** Not null when all the products are successfully fetched. */
  const productsData = productQueries.every((q) => q.status === 'success') ? productQueries.map((q) => q.data!) : null;

  const validationSchema: Yup.SchemaOf<NewOrderFormValues> = Yup.object({
    clientName: Yup.string().required('Required'),
    clientEmail: Yup.string().required('Required'),
    clientPhone: Yup.string().required('Required'),
    clientAddress: Yup.string().required('Required'),
  });

  const formik = useFormik<NewOrderFormValues>({
    initialValues: {
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      clientPhone: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createOrderMutation.mutate({
        order: {
          products: orderProducts,
          client: {
            name: values.clientName,
            email: values.clientEmail,
            address: values.clientAddress,
            phoneNumber: values.clientPhone,
          },
        },
      });
    },
  });

  return (
    <>
      <CardContainer>
        <h1>New Order</h1>

        <form onSubmit={formik.handleSubmit}>
          <Button variant="contained" color="primary" onClick={() => setSelectProductDialogOpen(true)}>
            Add Product
          </Button>

          {productsData !== null && (
            <OrderProductsTable
              products={orderProducts.map((orderProduct) => ({
                count: orderProduct.count,
                ...productsData.find((p) => p.id === orderProduct.id)!,
              }))}
              onProductCountChange={handleProductCountChange}
            ></OrderProductsTable>
          )}

          <div>
            <h2>Client details</h2>
            <TextField
              label="Name"
              variant="outlined"
              {...formik.getFieldProps('clientName')}
              error={formik.errors.clientName !== undefined && formik.touched.clientName}
              helperText={formik.errors.clientName}
            ></TextField>
            <TextField
              label="Email"
              variant="outlined"
              {...formik.getFieldProps('clientEmail')}
              error={formik.errors.clientEmail !== undefined && formik.touched.clientEmail}
              helperText={formik.errors.clientEmail}
            ></TextField>
            <TextField
              label="Address"
              variant="outlined"
              {...formik.getFieldProps('clientAddress')}
              error={formik.errors.clientAddress !== undefined && formik.touched.clientAddress}
              helperText={formik.errors.clientAddress}
            ></TextField>
            <TextField
              label="Phone number"
              variant="outlined"
              {...formik.getFieldProps('clientPhone')}
              error={formik.errors.clientPhone !== undefined && formik.touched.clientPhone}
              helperText={formik.errors.clientPhone}
            ></TextField>
          </div>

          <Button type="submit" variant="contained" color="primary">
            Create new order
          </Button>
        </form>
      </CardContainer>

      <SelectProductDialog
        open={selectProductDialogOpen}
        onClose={() => setSelectProductDialogOpen(false)}
        onSelect={handleSelectProduct}
      ></SelectProductDialog>
    </>
  );
}
