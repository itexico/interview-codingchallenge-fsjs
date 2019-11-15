'use strict';

jest.unmock( 'axios' );

// const mongoose = require( 'mongoose' );
const axios = require( 'axios' );
const startServer = require( '../../../server' );

const Item = require( '../../../models/item' );
const BASE_PORT = 8880;
const PORT = BASE_PORT + parseInt( process.env.JEST_WORKER_ID || 1 );

const getBaseItem = baseNumber => ({
  itemDescription: `test item ${baseNumber}`,
});

let server, baseURL, apiAxios;

beforeAll( async () => {
  server = await startServer({ port: PORT });
  baseURL = `http://localhost:${PORT}`;
  apiAxios = axios.create({ baseURL });
});

afterAll( () => server.close() );

afterEach( async () => {
  await Promise.all( [
    Item.deleteMany({}),
  ] );
});

describe( 'Item endpoints', () => {

  it( '[GET] "/item" - it should get TWO items', async () => {

    const item1 = getBaseItem( 1 );
    const item2 = getBaseItem( 2 );

    // Create an item.
    await Promise.all( [
      apiAxios.post( '/item', item1 ).catch( e => console.log( 'err', e ) ),
      apiAxios.post( '/item', item2 ).catch( e => console.log( 'err', e ) )
    ] );

    // Fetch all current items.
    const { data: fetchedItems, status } = await apiAxios.get( '/item' )
      .catch( e => console.log( 'err', e ) );

    expect( fetchedItems.length ).toEqual( 2 );
    expect( status ).toEqual( 200 );

  });

  it( '[GET] "/item/:id" - it should get ONE item', async () => {

    const item1 = getBaseItem( 1 );

    // Create an item.
    const { data: postedItem } = await apiAxios
      .post( '/item', item1 ).catch( e => console.log( 'err', e ) );

    // Fetch a specific item.
    const { data: fetchedItem, status } = await apiAxios.get( `/item/${postedItem._id}` )
      .catch( e => console.log( 'err', e ) );

    expect( item1.itemDescription ).toEqual( fetchedItem.itemDescription );
    expect( status ).toEqual( 200 );

  });

  it( '[POST] "/item" - it should register ONE item', async () => {

    const item1 = getBaseItem( 1 );

    // Create an item.
    const { data: postedItem, status } = await apiAxios
      .post( '/item', item1 ).catch( e => console.log( 'err', e ) );

    // Find the postedItem in the DB to compare.
    const dbItem = await Item.findById( postedItem._id );

    expect( dbItem.itemDescription ).toEqual( item1.itemDescription );
    expect( status ).toEqual( 200 );

  });

  it( '[PATCH] "/item" - it should edit an existing item', async () => {

    const item1 = getBaseItem( 1 );
    const modifiedItem1 = getBaseItem( 1 );
    modifiedItem1.itemDescription = 'modified item 1';

    // Create an item.
    const { data: postedItem } = await apiAxios
      .post( '/item', item1 ).catch( e => console.log( 'err', e ) );

    // Update item based on modified version.
    const { status } = await apiAxios
      .patch( `/item/${postedItem._id}`, modifiedItem1 )
      .catch( e => console.log( 'err', e ) );

    const dbItem = await Item.findById( postedItem._id );
    expect( dbItem.itemDescription ).toEqual( modifiedItem1.itemDescription );
    expect( status ).toEqual( 200 );

  });

  it( '[DELETE] "/item" - it should delete the given item', async () => {

    const item1 = getBaseItem( 1 );

    // Create an item.
    const { data: postedItem } = await apiAxios
      .post( '/item', item1 ).catch( e => console.log( 'err', e ) );

    const dbItemBeforeDelete = await Item.findById( postedItem._id );
    expect( dbItemBeforeDelete.itemDescription ).toEqual( item1.itemDescription );

    const countDbItemsBeforeDeletion = await Item.countDocuments({});
    expect( countDbItemsBeforeDeletion ).toEqual( 1 );


    // Delete the item.
    const { status } = await apiAxios
      .delete( `/item/${postedItem._id}` ).catch( e => console.log( 'err', e ) );

    const countDbItemsAfterDeletion = await Item.countDocuments({});
    expect( countDbItemsAfterDeletion ).toEqual( 0 );
    expect( status ).toEqual( 200 );

  });

});
