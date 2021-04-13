import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  Grid,
  Input,
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

  const { isShown, toggle, isShownForm, toogleForm } = useModal();

  // Custom hooks
  const clickRef = useRef();
  useOnClickOutside(clickRef, () => setIsOpenMenu(false));

  // Handlers
  const handleOpenMenu = () => setIsOpenMenu(!isOpenMenu);
  const handleOpenModal = () => toggle();
  const handleCloseModal = () => toggle();
  const handleOpenForm = () => toogleForm();

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
              <span className='block ml-3' ref={clickRef as any}>
                <button
                  type='button'
                  onClick={handleOpenMenu}
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100'
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
                    className='origin-top-right absolute right-48 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='options-menu'
                  >
                    <div className='py-1' role='none'>
                      <Link
                        to={`edit/${id}`}
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
        >
          <button className='flex flex-row mt-4' onClick={handleOpenForm}>
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
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            Add item
          </button>
          {isShownForm && (
            <Modal
              title='Add Item'
              content={
                <Formik
                  initialValues={{
                    title: '',
                    description: '',
                    featuredImage: '',
                  }}
                  onSubmit={async (values) => {
                    await axios
                      .post(`http://localhost:7000/api/lists/${id}/items`, {
                        title: values.title,
                        description: values.description,
                        featuredImage: values.featuredImage,
                      })
                      .then(
                        (res) =>
                          res &&
                          toast.success(
                            `Your item ${values.title} has been created`,
                            {
                              position: 'top-right',
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            }
                          )
                      )
                      .then(() => toggle())
                      .then(() =>
                        setTimeout(() => {
                          window.location.reload();
                        }, 2000)
                      )
                      .catch((e) => console.log(e.message));
                  }}
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <Form className='mt-10' onSubmit={handleSubmit}>
                      <div className='relative w-96'>
                        <Input
                          label='Item name'
                          labelColor='black'
                          focusColor='black'
                          textAlign='text-left'
                          placeholder='Write your item title'
                          htmlFor='Item title'
                          type='text'
                          id='title'
                          value={values.title}
                          onChange={handleChange}
                          name='title'
                        />
                      </div>
                      <div className='relative w-96'>
                        <Input
                          label='Item description'
                          labelColor='black'
                          focusColor='black'
                          textAlign='text-left'
                          placeholder='Write a short item description'
                          htmlFor='Item description'
                          type='text'
                          id='description'
                          value={values.description}
                          onChange={handleChange}
                          name='description'
                        />
                      </div>
                      <div className='relative w-96'>
                        <Input
                          label='Item Featured image url'
                          labelColor='black'
                          focusColor='black'
                          textAlign='text-left'
                          placeholder='Paste or write an image url'
                          htmlFor='Item image'
                          type='text'
                          id='featuredImage'
                          value={values.featuredImage}
                          onChange={handleChange}
                          name='featuredImage'
                        />
                      </div>

                      <button
                        type='submit'
                        className='px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-500 dark:focus:bg-gray-700'
                      >
                        Create
                      </button>
                    </Form>
                  )}
                </Formik>
              }
            />
          )}
        </PageHeader>
        <div className='flex flex-col'>
          {items.length === 0 ? (
            <div className='flex flex-col p-24 mx-auto items-center'>
              <img
                src='https://res.cloudinary.com/bluecatencode/image/upload/v1618290851/undraw_Add_notes_re_ln36_tqjkni.svg'
                alt='empty'
                className='max-w-full w-48'
              />
              <h3 className='font-medium text-xl mt-4'>No items</h3>
            </div>
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
