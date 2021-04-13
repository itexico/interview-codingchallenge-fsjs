import { render } from '@testing-library/react';
import { Loader } from '..';

describe('component/Loader', () => {
  test('should render the component correctly', () => {
    const rendered = render(<Loader />);

    expect(rendered.baseElement).toBeInTheDocument();
  });
});
