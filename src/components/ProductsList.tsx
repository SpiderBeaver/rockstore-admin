import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/macro';
import { getProducts } from '../api/api';

const ProductsListStyled = styled.table`
  width: 100%;
  max-width: 80em;
`;

const Header = styled.tr`
  text-align: left;
`;

const HeaderCell = styled.th`
  height: 4em;
`;

const Row = styled.tr`
  height: 3em;
`;

const Cell = styled.td`
  height: 4em;
  border-top: 1px solid #cccccc;
`;

const ProductImage = styled.img`
  max-height: 100%;
`;

const productsPerPage = 10;

interface Props {
  page?: number;
}

export default function ProductsList({ page }: Props) {
  const limit = productsPerPage;
  const offset = page !== undefined ? productsPerPage * (page - 1) : 0;
  const productsQuery = useQuery(['products', page], () => getProducts(limit, offset));

  return (
    <ProductsListStyled>
      <Header>
        <HeaderCell>Name</HeaderCell>
        <HeaderCell>Picture</HeaderCell>
        <HeaderCell>In Stock</HeaderCell>
        <HeaderCell>Action</HeaderCell>
      </Header>
      {productsQuery.data?.map((product) => (
        <Row key={product.id}>
          <Cell>{product.name}</Cell>
          <Cell>
            {product.pictureFilename !== null ? (
              <ProductImage
                src={`http://localhost:3001/uploads/${product.pictureFilename}`}
                alt={product.name}
              ></ProductImage>
            ) : null}
          </Cell>
          <Cell>12</Cell>
          <Cell></Cell>
        </Row>
      ))}
    </ProductsListStyled>
  );
}
