'use strict';

jest.unmock( 'axios' );

const axios = require( 'axios' );
const startServer = require( '../../../server' );

const BASE_PORT = parseInt( process.env.SERVER_PORT_TESTING || 8880 );
const PORT = BASE_PORT + parseInt( process.env.JEST_WORKER_ID || 1 );
process.env.TEST_DATABASE_NEEDED = 'NO';

let server, baseURL, apiAxios;

beforeAll( async () => {
  server = await startServer({ port: PORT });
  baseURL = `http://localhost:${PORT}`;
  apiAxios = axios.create({ baseURL });
});

afterAll( () => server.close() );

describe( 'Test cookies', () => {

  it( '[GET] "/isAutheticated" - should validate the cookie authentication process', async () => {

    // First request to set cookie.
    const response = await apiAxios
      .get( '/auth/isAutheticated', { withCredentials: true })
      .catch( e => console.log( 'err', e ) );

    expect( response.data.isAutheticated ).toBe( false );


    const [cookie] = response.headers['set-cookie'];

    // eslint-disable-next-line require-atomic-updates
    apiAxios.defaults.headers.Cookie = cookie;

    // Second request to should have the _auth cookie set.
    const response2 = await apiAxios
      .get( '/auth/isAutheticated', {
        withCredentials: true,
      })
      .catch( e => console.log( 'err', e ) );
    expect( response2.data.isAutheticated ).toBe( true );

  });

});
