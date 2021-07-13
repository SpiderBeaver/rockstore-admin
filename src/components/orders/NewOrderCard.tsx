import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useCreateOrderMutation } from '../../hooks/useCreateOrderMutation';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import OrderClientFormFields, { OrderClientValues, orderClientValuesValidationSchema } from './OrderClientFormFields';
import OrderProductsTable from './OrderProductsTable';
import SelectProductDialog from './SelectProductDialog';

interface OrderProduct {
  id: number;
  count: number;
}

interface NewOrderFormValues {
  client: OrderClientValues;
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

  const validationSchema: Yup.SchemaOf<NewOrderFormValues> = Yup.object({
    client: orderClientValuesValidationSchema,
  });

  const formik = useFormik<NewOrderFormValues>({
    initialValues: {
      client: {
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createOrderMutation.mutate({
        order: {
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

  return (
    <>
      <Section>
        <SectionHeading>New Order</SectionHeading>

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
            Create new order
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
