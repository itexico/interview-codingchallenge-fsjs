import React, { useEffect, useState } from 'react';
import { Grid, List, NavBar } from '../../components';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [data, setData] = useState([]) as any;

  useEffect(() => {
    const getLists = async () => {
      const resp = await fetch('http://localhost:7000/api/lists/');
      const result = await resp.json();

      setData(result.lists);
    };

    getLists();

    return () => {
      setData([]);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className='container flex flex-col justify-center p-10 lg:p-20 mx-auto'>
        <Grid cols='3' mobileCols='2'>
          <List lists={data} />
        </Grid>
      </div>
    </>
  );
};

export default Home;
