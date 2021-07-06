import { Button, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { getOrder } from '../../api/api';
import OrderClientFormFields, { OrderClientValues, orderClientValuesValidationSchema } from './OrderClientFormFields';
import OrderProductsTable from './OrderProductsTable';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useUpdateOrderMutation } from '../../hooks/useUpdateOrderMutation';
import SelectProductDialog from './SelectProductDialog';

const CardContainer = styled(Paper)`
  padding: 20px;
`;

interface OrderProduct {
  id: number;
  count: number;
}

interface EditOrderFormValues {
  client: OrderClientValues;
}

export default function EditOrderCard() {
  const { orderId: orderIdString } = useParams<{ orderId: string }>();
  const orderId = parseInt(orderIdString);

  const [selectProductDialogOpen, setSelectProductDialogOpen] = useState(false);
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

  const order = useQuery(['order', orderId], () => getOrder(orderId));
  useEffect(() => {
    if (order.status === 'success' && order.data) {
      setOrderProducts(order.data.items.map((item) => ({ id: item.product.id, count: item.count })));
    }
  }, [order.status, order.data]);

  const history = useHistory();
  // TODO: Try .mutateAsync instead on onSuccess callbacks.
  const updateOrderMutation = useUpdateOrderMutation(() => history.push('/orders'));

  const validationSchema: Yup.SchemaOf<EditOrderFormValues> = Yup.object({
    client: orderClientValuesValidationSchema,
  });

  const formik = useFormik<EditOrderFormValues>({
    initialValues: {
      client: {
        name: order.data?.client.name ?? '',
        email: order.data?.client.email ?? '',
        address: order.data?.client.address ?? '',
        phoneNumber: order.data?.client.phoneNumber ?? '',
      },
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateOrderMutation.mutate({
        orderId: orderId,
        orderData: {
          products: orderProducts,
          client: {
            name: values.client.name,
            email: values.client.email,
            address: values.client.address,
            phoneNumber: values.client.phoneNumber,
          },
        },
      });
    },
  });

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

  return (
    <>
      <CardContainer>
        <h1>Edit Order</h1>

        <form onSubmit={formik.handleSubmit}>
          <Button variant="contained" color="primary" onClick={() => setSelectProductDialogOpen(true)}>
            Add Product
          </Button>

          <OrderProductsTable
            orderProducts={orderProducts}
            onProductCountChange={handleProductCountChange}
          ></OrderProductsTable>

          <div>
            <h2>Client details</h2>
            <OrderClientFormFields
              fieldNamePrefix="client."
              getFieldProps={formik.getFieldProps}
              errors={formik.errors.client}
              touched={formik.touched.client}
            ></OrderClientFormFields>
          </div>

          <Button type="submit" variant="contained" color="primary">
            Save changes
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
