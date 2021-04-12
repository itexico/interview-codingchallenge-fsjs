import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  ListItem,
  NavBar,
  PageHeader,
} from '../../components';

interface ListDetailsProps {
  listId: string;
}

const ListDetails: React.FC<ListDetailsProps> = () => {
  const [details, setDetails] = useState([]) as any;
  const [items, setItems] = useState([]) as any;
  const { id } = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    const getDetails = async () => {
      const resp = await fetch(`http://localhost:7000/api/lists/${id}`);
      const resultDetails = await resp.json();
      setDetails(resultDetails);
    };

    const getItems = async () => {
      const resp = await fetch(`http://localhost:7000/api/lists/${id}/items`);
      const resultItems = await resp.json();
      setItems(resultItems);
    };

    getDetails();
    getItems();

    return () => {
      setDetails([]);
      setItems([]);
    };
  }, [id]);

  console.log(details);
  console.log(items);

  return (
    <>
      <NavBar />
      <Container>
        <PageHeader title={details.title} />
        <div className='flex flex-col'>
          {items.length === 0 ? (
            'No data yet'
          ) : (
            <Grid cols='2'>
              <ListItem listItem={items} />
            </Grid>
          )}
        </div>
      </Container>
    </>
  );
};

export default ListDetails;
