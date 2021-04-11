import React, { ReactNode } from 'react';

interface GridProps {
  children: ReactNode | ReactNode[];
  cols?: string;
  mobileCols?: string;
}

export const Grid: React.FC<GridProps> = ({ children, cols, mobileCols }) => {
  return (
    <div
      className={`grid gap-6 mb-8 md:grid-cols-${mobileCols} lg:grid-cols-${cols}`}
    >
      {children}
    </div>
  );
};
