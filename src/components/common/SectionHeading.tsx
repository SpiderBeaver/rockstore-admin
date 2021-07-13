import React from 'react';
import styled from 'styled-components/macro';

const Heading = styled.h2`
  margin: 0 0 1em 0;
`;

export default function SectionHeading({ children }: React.PropsWithChildren<{}>) {
  return <Heading>{children}</Heading>;
}
