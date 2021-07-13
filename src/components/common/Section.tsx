import { Paper } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components/macro';

const SectionContainer = styled(Paper)`
  padding: 1em;
`;

export default function Section({ children }: React.PropsWithChildren<{}>) {
  return <SectionContainer>{children}</SectionContainer>;
}
