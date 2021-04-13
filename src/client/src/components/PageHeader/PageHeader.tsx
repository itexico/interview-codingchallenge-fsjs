import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title?: string;
  actions?: ReactNode | ReactNode[];
  children?: any;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  actions,
  children,
}) => {
  return (
    <>
      <div className='flex flex-row items-center lg:justify-between'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>
            {title}
          </h2>
        </div>
        {actions}
      </div>
      <div>{children}</div>
    </>
  );
};
