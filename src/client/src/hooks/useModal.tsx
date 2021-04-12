import { useState } from 'react';

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [modalData, setModalData] = useState<string>('');
  const toggle = () => {
   return setIsShown(!isShown), 
    setModalData(modalData);
  };
  return {
    isShown,
    modalData,
    toggle,
  };
};
