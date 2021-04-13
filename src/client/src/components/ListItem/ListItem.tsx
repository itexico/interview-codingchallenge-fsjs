import axios from 'axios';
import { format } from 'date-fns';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from '..';
import { useModal } from '../../hooks/useModal';
import { ModalConfirmButtons } from '../Modal/utils';

interface ListItemProps {
  listItem: any;
  header?: ReactNode | ReactNode[];
}

export const ListItem: React.FC<ListItemProps> = ({ listItem }) => {
  const { isShown, toggle } = useModal();

  // Handlers
  const handleOpenModal = () => toggle();
  const handleCloseModal = () => toggle();

  const handleDeleteItem = async (listId: string, itemId: string) => {
    await axios
      .delete(`http://localhost:7000/api/lists/${listId}/items/${itemId}`)
      .then(
        (res) =>
          res &&
          toast.success(`Your item has been deleted`, {
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
  };

  return (
    <>
      {listItem.map((item: any) => (
        <blockquote
          className='flex flex-col items-center justify-between w-full col-span-1 p-6 mt-4 bg-white rounded-lg shadow'
          key={item.id}
        >
          <div className='flex justify-around items-center'>
            <img
              className='flex-shrink-0 w-24 h-24 bg-gray-300 rounded-full'
              src={item.featuredImage}
              alt={item.title}
            />
            <div className='flex flex-col pr-10'>
              <div className='relative pl-12'>
                <h1 className='mt-4 mb-2 font-sans text-2xl font-black text-gray-700 tracking-tighter'>
                  {item.title}
                </h1>
                <p className='mt-2 text-sm text-gray-600 sm:text-base lg:text-sm xl:text-base'>
                  {item.description}
                </p>
              </div>
              <h3 className='pl-12 mt-3 text-sm font-medium leading-5 text-gray-800 truncate sm:text-base lg:text-base'>
                Created on:
                <span className='mt-1 ml-1 text-sm leading-5 text-gray-500 truncate'>
                  {format(new Date(item.createdAt), 'PP')}
                </span>
              </h3>
              <p className='mt-1 text-sm leading-5 text-gray-500 truncate'></p>
            </div>
          </div>

          <div className='flex ml-auto mt-6'>
            <span className='block'>
              <Link
                to={`/lists/${item.list}/edit/items/${item._id}`}
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
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
              </Link>
            </span>

            <span className='block ml-3'>
              <button
                type='button'
                onClick={handleOpenModal}
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
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
              </button>

              {isShown && (
                <Modal
                  title='Delete level'
                  content='Are you sure you want to delete this level?'
                  actions={
                    <ModalConfirmButtons
                      isDelete
                      onConfirm={() => handleDeleteItem(item.list, item._id)}
                      onCancel={handleCloseModal}
                    />
                  }
                />
              )}
            </span>
          </div>
        </blockquote>
      ))}
    </>
  );
};
