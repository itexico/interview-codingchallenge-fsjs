import React from 'react';
import {format} from 'date-fns';
import { Card } from '..';
import { Link } from 'react-router-dom';

interface ListProps {
  lists: any;
}

export const List: React.FC<ListProps> = ({ lists }) => {
  return (
    <>
      {lists.map((item: any) => (
        <Card
        key={item._id}
        cardHeader={
            <div className='flex items-center justify-between'>
              <span className='text-sm font-light text-gray-600 dark:text-gray-400'>
                {format(new Date(item.createdAt), 'PP')}
              </span>
              <span className='px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500'>
                {item.category}
              </span>
            </div>
          }
          cardTitle={item.title}
        >
          <p>{item.description}</p>

          <p className="mt-4">
            <b>Items:</b> {item.numItems}
          </p>

          <div className="flex items-center justify-between mt-4">
            <Link to="#" className="text-gray-800 font-semibold dark:text-gray-400 hover:underline">View list</Link>

            <Link to="#" className="text-gray-800 font-semibold dark:text-gray-400 hover:underline">Edit list</Link>

        </div>
        </Card>
      ))}
    </>
  );
};
