import { render } from '@testing-library/react';
import { Card } from '..';

describe('component/Card', () => {
  const props = {
    cardHeader: 'Cool header',
    cardTitle: 'Cool title',
  };
  test('should render the component correctly', () => {
    const rendered = render(
      <Card {...props} style={{ color: 'black' }}>
        <p>Hey this is a demo</p>
      </Card>
    );

    expect(rendered.baseElement).toBeInTheDocument();
  });
});
