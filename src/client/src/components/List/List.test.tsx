import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { List } from '..';

describe('component/List', () => {
  const props = {
    lists: [
      {
        items: [
          '6072b13ea9659bb4332822e4',
          '6072b14ca9659bb4332822e6',
          '60752bfc6bdbcf08da1a5cd5',
          '60752c8c6bdbcf08da1a5cd6',
          '60752f736bdbcf08da1a5cd7',
          '60752f9b6bdbcf08da1a5cd8',
        ],
        numItems: 6,
        _id: '6072afde75b0bfb39114bf7f',
        title: 'My favorite music album',
        description: 'List to add/view/update/delete my favorite music albums.',
        category: 'music',
        createdAt: '2021-04-11T08:14:22.204Z',
        updatedAt: '2021-04-13T05:43:55.724Z',
        __v: 6,
      },
    ],
  };
  test('should render the component correctly', () => {
    const rendered = render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <List {...props} key='01' />
      </MemoryRouter>
    );

    expect(rendered.baseElement).toBeInTheDocument();
  });
});
