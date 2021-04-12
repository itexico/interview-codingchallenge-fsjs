import React, { useEffect, useState } from 'react';
import { Container, NavBar } from '../../components';
import { EditListItem } from '../../components/ListItem/EditListItem';
import { Loader } from '../../components/Loader/Loader';

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

  console.log(itemDetails);

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
