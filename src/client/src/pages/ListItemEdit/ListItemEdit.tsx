import React, { useEffect, useState } from 'react';
import { EditListItem, Loader, NavBar } from '../../components';

interface ListItemEditProps {}

const ListItemEdit: React.FC<ListItemEditProps> = () => {
  const [itemDetails, setItemDetails] = useState() as any;
  const pathId = window.location.pathname;
  const listId = pathId.includes('edit/') && pathId.replace('edit/', '');

  useEffect(() => {
    const getDetails = async () => {
      const resp = await fetch(`http://localhost:7000/api${listId}`);
      const resultDetails = await resp.json();

      setItemDetails(resultDetails);
    };

    getDetails();

    return () => {
      setItemDetails([]);
    };
  }, [listId]);

  return (
    <>
      <NavBar />

      {itemDetails === undefined ? (
        <Loader />
      ) : (
        <EditListItem items={itemDetails} />
      )}
    </>
  );
};

export default ListItemEdit;
