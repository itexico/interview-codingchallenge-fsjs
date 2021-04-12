import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode | ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='container flex flex-col justify-center p-10 lg:p-20 mx-auto'>
      {children}
    </div>
  );
};
