import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCreateProductMutation } from '../../hooks/useCreateProductMutation';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import NewProductForm, { NewProductFormValues } from './NewProductForm';

export default function NewProductCard() {
  const history = useHistory();

  const createProductMutation = useCreateProductMutation(() => history.push('/products'));

  const handleSumbit = (values: NewProductFormValues) => {
    const priceParsed = parseFloat(values.price);
    const inStockParsed = parseInt(values.inStock);
    createProductMutation.mutate({
      name: values.name,
      sku: values.sku,
      description: values.description,
      price: priceParsed,
      inStock: inStockParsed,
      file: values.file,
    });
  };

  return (
    <Section>
      <SectionHeading>New Product</SectionHeading>

      <NewProductForm onSubmit={handleSumbit}></NewProductForm>
    </Section>
  );
}
