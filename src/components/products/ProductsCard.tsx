import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import ProductsTableView from './ProductsTableView';

const NewProductButton = styled(Button)`
  margin-bottom: 2em;
`;

export default function ProductsCard() {
  return (
    <Section>
      <SectionHeading>Products</SectionHeading>
      <Link to="/products/new">
        <NewProductButton variant="contained" color="primary">
          New Product
        </NewProductButton>
      </Link>

      <ProductsTableView></ProductsTableView>
    </Section>
  );
}
