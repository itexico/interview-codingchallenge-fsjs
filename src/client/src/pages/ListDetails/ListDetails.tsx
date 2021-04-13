import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  ListItem,
  Modal,
  NavBar,
  PageHeader,
} from '../../components';
import { ModalConfirmButtons } from '../../components/Modal/utils';
import { useOnClickOutside } from '../../hooks/useClickOutside';
import { useModal } from '../../hooks/useModal';

interface ListDetailsProps {
  listId: string;
}

const ListDetails: React.FC<ListDetailsProps> = () => {
  const [details, setDetails] = useState([]) as any;
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [items, setItems] = useState([]) as any;
  const { id } = useParams<Record<string, string | undefined>>();
  const history = useHistory();

  const { isShown, toggle } = useModal();

  // Custom hooks
  const clickRef = useRef();
  useOnClickOutside(clickRef, () => setIsOpenMenu(false));

  // Handlers
  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleOpenModal = () => toggle();
  const handleCloseModal = () => toggle();

  const handleDeleteList = async (listId: string) => {
    const res = await axios.delete(`http://localhost:7000/api/lists/${listId}`);

    if (res) {
      history.push('/');
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      const resp = await fetch(`http://localhost:7000/api/lists/${id}`);
      const resultDetails = await resp.json();
      setDetails(resultDetails);
    };

    const getItems = async () => {
      const resp = await fetch(`http://localhost:7000/api/lists/${id}/items`);
      const resultItems = await resp.json();
      setItems(resultItems);
    };

    getDetails();
    getItems();

    return () => {
      setDetails([]);
      setItems([]);
    };
  }, [id]);

  return (
    <>
      <NavBar />
      <Container>
        <PageHeader
          title={details.title}
          actions={
            <div className='mt-5 flex lg:mt-0 lg:ml-4'>
              <span className='block'>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2  text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 mr-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
                    />
                  </svg>
                  Sort
                </button>
              </span>

              <span className='block ml-3' ref={clickRef as any}>
                <button
                  type='button'
                  onClick={handleOpenMenu}
                  className='inline-flex items-center px-4 py-2  text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                    />
                  </svg>
                </button>
                {isOpenMenu && (
                  <div
                    className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='options-menu'
                  >
                    <div className='py-1' role='none'>
                      <Link
                        to={`http://localhost:7000/api/lists/edit/${id}`}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                      >
                        Edit List
                      </Link>
                      <button
                        onClick={handleOpenModal}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </span>
              {isShown && (
                <Modal
                  title='Delete level'
                  content='Are you sure you want to delete this level?'
                  actions={
                    <ModalConfirmButtons
                      isDelete
                      onConfirm={() => handleDeleteList(id as any)}
                      onCancel={handleCloseModal}
                    />
                  }
                />
              )}
            </div>
          }
        />
        <div className='flex flex-col'>
          {items.length === 0 ? (
            'No data yet'
          ) : (
            <Grid cols='2'>
              <ListItem listItem={items} />
            </Grid>
          )}
        </div>
      </Container>
    </>
  );
};

export default ListDetails;
