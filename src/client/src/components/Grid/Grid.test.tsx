import { render } from '@testing-library/react';
import { Grid } from '..';

describe('component/Grid', () => {
  const props = {
    cols: '3',
    mobileCols: '2',
  };
  test('should render the component correctly', () => {
    const rendered = render(
      <Grid {...props}>
        <p>Hey this is a demo</p>
      </Grid>
    );

    expect(rendered.baseElement).toBeInTheDocument();
  });
});
