import React from 'react';

interface PageHeaderProps {
  title?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className='lg:flex flex-row lg:items-center lg:justify-between'>
      <div className='flex-1 min-w-0'>
        <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>
          {title}
        </h2>
      </div>
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

        <span className='block ml-3'>
          <button
            type='button'
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
        </span>



          {/* <div
            className='origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='mobile-menu'
          >
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              role='menuitem'
            >
              Edit
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              role='menuitem'
            >
              View
            </a>
          </div> */}
      </div>
    </div>
  );
};
