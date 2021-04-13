import React from 'react';
import { render } from '@testing-library/react';
import { Container } from '..';

describe('component/Container', () => {
  test('should render the component correctly', () => {
    const rendered = render(
      <Container>
        <p>Hey this is a demo</p>
      </Container>
    );

    expect(rendered.baseElement).toBeInTheDocument();
  });
});
