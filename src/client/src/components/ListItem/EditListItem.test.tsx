import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { EditListItem } from '..';

describe('component/EditListItem', () => {
  const props = {
    items: [
      {
        _id: '60752f736bdbcf08da1a5cd7',
        title: 'TDWP',
        featuredImage:
          'https://res.cloudinary.com/bluecatencode/image/upload/v1604417128/default_profile_glpauv.png',
        description: 'This is a cool description for my app.',
        list: '6072afde75b0bfb39114bf7f',
        createdAt: '2021-04-13T05:43:15.762Z',
        updatedAt: '2021-04-13T05:43:15.762Z',
        __v: 0,
      },
    ],
  };
  test('should render the component correctly', () => {
    const rendered = render(
      <MemoryRouter initialEntries={[{ pathname: '/lists/:id/items/:id' }]}>
        <EditListItem {...props} key='01' />
      </MemoryRouter>
    );

    expect(rendered.baseElement).toBeInTheDocument();
  });
});
