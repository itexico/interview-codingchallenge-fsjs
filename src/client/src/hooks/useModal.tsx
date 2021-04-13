import { useState } from 'react';

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isShownForm, setIsShownForm] = useState<boolean>(false);

  const toggle = () => {
    return setIsShown(!isShown);
  };

  const toogleForm = () => {
    return setIsShownForm(!isShownForm);
  };

  return {
    isShown,
    toggle,
    isShownForm,
    toogleForm,
  };
};
