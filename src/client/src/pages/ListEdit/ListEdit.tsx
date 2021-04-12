import React, { useEffect, useState } from 'react';
import { NavBar } from '../../components';
import { EditList } from '../../components/List/EditList';
import { Loader } from '../../components/Loader/Loader';

interface ListEditProps {}

const ListEdit: React.FC<ListEditProps> = ({}) => {
  const [listDetails, setListDetails] = useState() as any;
  const pathId = window.location.pathname;
  const listId = pathId.substring(pathId.lastIndexOf('/') + 1);

  useEffect(() => {
    const getDetails = async () => {
      const resp = await fetch(`http://localhost:7000/api/lists/${listId}`);
      const resultDetails = await resp.json();

      setListDetails(resultDetails);
    };

    getDetails();

    return () => {
      setListDetails([]);
    };
  }, [listId]);

  return (
    <>
      <NavBar />
      {listDetails === undefined ? (
        <Loader />
      ) : (
        <EditList items={listDetails} />
      )}
    </>
  );
};

export default ListEdit;
