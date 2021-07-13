import { Button, MenuItem, Select } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getOrder } from '../../api/api';
import { OrderStatus } from '../../api/dto/OrderDto';
import { useUpdateOrderMutation } from '../../hooks/useUpdateOrderMutation';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import OrderClientFormFields, { OrderClientValues, orderClientValuesValidationSchema } from './OrderClientFormFields';
import OrderProductsTable from './OrderProductsTable';
import SelectProductDialog from './SelectProductDialog';

interface OrderProduct {
  id: number;
  count: number;
}

interface EditOrderFormValues {
  client: OrderClientValues;
  status: OrderStatus | null;
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
    status: Yup.mixed<OrderStatus | null>().defined(),
  });

  const formik = useFormik<EditOrderFormValues>({
    initialValues: {
      client: {
        name: order.data?.client.name ?? '',
        email: order.data?.client.email ?? '',
        address: order.data?.client.address ?? '',
        phoneNumber: order.data?.client.phoneNumber ?? '',
      },
      status: order.data?.status ?? null,
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
          status: values.status!,
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
      <Section>
        <SectionHeading>Edit Order</SectionHeading>

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

          <div>
            <h2>Status</h2>
            {order.status === 'success' && order.data && (
              <Select variant="outlined" label="Status" {...formik.getFieldProps('status')}>
                <MenuItem value={OrderStatus.New}>New</MenuItem>
                <MenuItem value={OrderStatus.Processing}>Processing</MenuItem>
                <MenuItem value={OrderStatus.Completed}>Completed</MenuItem>
                <MenuItem value={OrderStatus.Cancelled}>Cancelled</MenuItem>
              </Select>
            )}
          </div>

          <Button type="submit" variant="contained" color="primary">
            Save changes
          </Button>
        </form>
      </Section>

      <SelectProductDialog
        open={selectProductDialogOpen}
        onClose={() => setSelectProductDialogOpen(false)}
        onSelect={handleSelectProduct}
      ></SelectProductDialog>
    </>
  );
}
