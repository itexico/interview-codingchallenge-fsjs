import React, { CSSProperties, ReactNode } from 'react';

interface CardProps {
  cardTitle: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
  style?: CSSProperties;
}

export const Card: React.FC<CardProps> = ({ cardTitle, children, style }) => {
  return (
    <div
      style={style}
      className='flex flex-wrap flex-col h-full p-8 bg-gray-100 shadow-xl rounded-xl dark:bg-gray-900 sm:py-5 xl:px-10 '
    >
      <h1 className='mt-auto mb-2 font-sans text-2xl font-black text-gray-700 tracking-tighter'>
        {cardTitle}
      </h1>
      {children}
    </div>
  );
};
