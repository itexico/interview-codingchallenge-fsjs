import React, { useEffect, useState } from 'react';
import { Card, Grid, List, NavBar } from '../../components';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [data, setData] = useState([]) as any;

  useEffect(() => {
    const getLists = async () => {
      const resp = await fetch('http://localhost:7000/api/lists/');
      const result = await resp.json();
      console.log(typeof result);

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
          {/* {data.map((item: any) => 
         <Card cardTitle={item.title}>
            <p>{item.description}</p>
          </Card>)} */}
          <List lists={data} />
          {/* <Card cardTitle='Favorite Movies'>
            <p>Hello world</p>
          </Card>
          <Card cardTitle='Favorite Movies'>
            <p>Hello world</p>
          </Card> */}
        </Grid>
      </div>
    </>
  );
};

export default Home;
