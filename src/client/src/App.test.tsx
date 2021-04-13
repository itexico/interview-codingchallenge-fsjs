import { render } from '@testing-library/react';
import App from './App';

test('renders the root component correctly', () => {
  render(<App />);
  const rendered = render(<App />);
  expect(rendered.baseElement).toBeInTheDocument();
});
