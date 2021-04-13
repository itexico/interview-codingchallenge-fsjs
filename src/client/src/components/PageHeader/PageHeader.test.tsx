import { render } from '@testing-library/react';
import { PageHeader } from '..';

describe('component/PageHeader', () => {
    const props = {
        title: 'Demo',
        actions: <p>Cool actions</p>,
        children: <p>Cool children</p>,
    }
  test('should render the component correctly', () => {
    const rendered = render(
        <PageHeader {...props} />
    );

    expect(rendered.baseElement).toBeInTheDocument();
  });
});
