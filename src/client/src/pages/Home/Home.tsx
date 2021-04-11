import React from 'react';
import { NavBar, Grid, Card } from '../../components';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <NavBar />
      <div className='container flex flex-col justify-center p-10 lg:p-20 mx-auto'>
        <Grid cols='3' mobileCols='2'>
          <Card cardTitle='Favorite Movies'>
            <p>Hello world</p>
          </Card>
          <Card cardTitle='Favorite Movies'>
            <p>Hello world</p>
          </Card>
          <Card cardTitle='Favorite Movies'>
            <p>Hello world</p>
          </Card>
        </Grid>
      </div>
    </>
  );
};

export default Home;
