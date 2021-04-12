import React from 'react';

interface ModalConfirmButtonsProps {
  onConfirm:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  onCancel:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  isDelete?: boolean;
  isSave?: boolean;
  isInfo?: boolean;
}

export const ModalConfirmButtons: React.FC<ModalConfirmButtonsProps> = ({
  onConfirm,
  onCancel,
  isDelete,
  isSave,
  isInfo,
}) => {
  return (
    <>
      <button
        type='button'
        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${
          isSave
            ? 'bg-gray-800 hover:bg-gray-600 focus:ring-gray-500'
            : isDelete
            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
            : isInfo
            ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            : 'bg-gray-400 hover:bg-gray-700 focus:ring-gray-500'
        }  focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
        onClick={onConfirm}
      >
        {isSave
          ? 'Save'
          : isDelete
          ? 'Delete'
          : isInfo
          ? 'Ok'
          : 'Default'}
      </button>
      <button
        type='button'
        className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
        onClick={onCancel}
      >
        Cancel
      </button>
    </>
  );
};
