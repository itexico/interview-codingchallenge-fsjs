import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NavBar } from '..';

describe('component/NavBar', () => {
  test('should render the component correctly', () => {
    const rendered = render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <NavBar />
      </MemoryRouter>
    );

    expect(rendered.baseElement).toBeInTheDocument();
  });
});
