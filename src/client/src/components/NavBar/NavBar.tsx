import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from '..';
import { useOnClickOutside } from '../../hooks/useClickOutside';
import { useModal } from '../../hooks/useModal';
import { Input } from '../Input/Input';

interface NavbarProps {}

export const NavBar: React.FC<NavbarProps> = () => {
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const { isShown, toggle } = useModal();

  // Custom hooks
  const clickRef = useRef();
  useOnClickOutside(clickRef, () => setIsOpenProfile(false));

  // Handlers
  const handleOpenProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  const handleOpenModal = () => toggle();

  return (
    <div className='text-gray-700 bg-white border-t border-b body-font'>
      <div className='flex flex-wrap p-5 mx-auto md:items-center md:flex-row'>
        <Link to='/' className='pr-2 lg:pr-8 lg:px-6 focus:outline-none'>
          <div className='inline-flex items-center'>
            <h2 className='font-semibold tracking-tighter transition duration-1000 ease-in-out transform text-blueGray-500 lg:text-md text-bold lg:mr-8'>
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
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </h2>
          </div>
        </Link>

        <div className='flex ml-auto'>
          <div className='mr-4 md:mr-8 lg:mr-12 relative'>
            <div className='flex items-center'>
              <button
                onClick={handleOpenModal}
                className='mr-5 text-sm font-semibold text-gray-600'
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
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                  />
                </svg>
              </button>
              <button
                type='button'
                className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                id='user-menu'
                onClick={handleOpenProfile}
              >
                <img
                  className='h-8 w-8 rounded-full'
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt=''
                />
              </button>
            </div>

            {isShown && (
              <Modal
                title='Add List'
                content={
                  <Formik
                    initialValues={{
                      title: '',
                      description: '',
                      category: '',
                    }}
                    onSubmit={async (values) => {
                      await axios
                        .post('http://localhost:7000/api/lists', {
                          title: values.title,
                          description: values.description,
                          category: values.category,
                        })
                        .then(
                          (res) =>
                            res &&
                            toast.success('Your list has been created', {
                              position: 'top-right',
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            })
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
                            label='List name'
                            labelColor='black'
                            focusColor='black'
                            textAlign='text-left'
                            placeholder='Write your list title'
                            htmlFor='List title'
                            type='text'
                            id='title'
                            value={values.title}
                            onChange={handleChange}
                            name='title'
                          />
                        </div>
                        <div className='relative w-96'>
                          <Input
                            label='Description'
                            labelColor='black'
                            focusColor='black'
                            textAlign='text-left'
                            placeholder='Write a short list description'
                            htmlFor='List description'
                            type='text'
                            id='description'
                            value={values.description}
                            onChange={handleChange}
                            name='description'
                          />
                        </div>
                        <div className='relative w-96'>
                          <Input
                            label='Category'
                            labelColor='black'
                            focusColor='black'
                            textAlign='text-left'
                            placeholder='Write a list category'
                            htmlFor='List category'
                            type='text'
                            id='category'
                            value={values.category}
                            onChange={handleChange}
                            name='category'
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

            {isOpenProfile && (
              <div
                className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu'
                ref={clickRef as any}
              >
                <Link
                  to='/profile'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  role='menuitem'
                >
                  Your Profile
                </Link>
                <Link
                  to='/settings'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  role='menuitem'
                >
                  Settings
                </Link>
                <Link
                  to='/signout'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  role='menuitem'
                >
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
