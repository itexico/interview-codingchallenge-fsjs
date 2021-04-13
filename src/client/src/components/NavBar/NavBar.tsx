import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOnClickOutside } from '../../hooks/useClickOutside';

interface NavbarProps {}

export const NavBar: React.FC<NavbarProps> = () => {
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);

  // Custom hooks
  const clickRef = useRef();
  useOnClickOutside(clickRef, () => setIsOpenProfile(false));

  // Handlers
  const handleOpenProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  return (
    <div className='text-gray-700 bg-white border-t border-b body-font'>
      <div className='flex flex-col flex-wrap p-5 mx-auto md:items-center md:flex-row'>
        <Link to='/' className='pr-2 lg:pr-8 lg:px-6 focus:outline-none'>
          <div className='inline-flex items-center'>
            <div className='w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-cyan-400 to-lightBlue-500' />
            <h2 className='font-semibold tracking-tighter transition duration-1000 ease-in-out transform text-blueGray-500 lg:text-md text-bold lg:mr-8'>
              Cool Lists
            </h2>
          </div>
        </Link>
        <nav className='flex flex-wrap items-center justify-center text-base '>
          <Link
            to='/'
            className='mr-5 text-sm font-semibold text-gray-600 lg:ml-24 hover:text-gray-800'
          >
            Home
          </Link>
          <Link
            to='#'
            className='mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800'
          >
            Contact
          </Link>
          <Link
            to='#'
            className='mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800'
          >
            Services
          </Link>
          <Link
            to='#'
            className='mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800'
          >
            Now
          </Link>
        </nav>
        <div className='flex ml-auto'>
          <div className='mr-4 md:mr-8 lg:mr-12 relative'>
            <div className='flex items-center'>
              <button className='mr-5 text-sm font-semibold text-gray-600'>
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
