import { render } from '@testing-library/react';
import { Modal } from '..';

describe('component/Modal', () => {
  const props = {
    title: 'Cool',
    content: 'Cool content',
    actions: <button>Cool button</button>,
    hasIcon: false,
  };
  test('should render the component correctly', () => {
    const rendered = render(<Modal {...props} />);

    expect(rendered.baseElement).toBeInTheDocument();
  });
});
