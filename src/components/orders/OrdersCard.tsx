import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import OrdersTableView from './OrdersTableView';

export default function OrdersCard() {
  return (
    <Section>
      <SectionHeading>Orders</SectionHeading>

      <Link to="/orders/new">
        <Button variant="contained" color="primary">
          New Order
        </Button>
      </Link>

      <OrdersTableView></OrdersTableView>
    </Section>
  );
}
