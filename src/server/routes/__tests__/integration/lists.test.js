'use strict';

jest.unmock( 'axios' );

const axios = require( 'axios' );
const startServer = require( '../../../server' );

const Item = require( '../../../models/item' );
const List = require( '../../../models/list' );
const BASE_PORT = parseInt( process.env.SERVER_PORT_TESTING || 8880 );
const PORT = BASE_PORT + parseInt( process.env.JEST_WORKER_ID || 1 );

const getBaseList = baseNumber => ({
  'title': `test list ${baseNumber}`,
  'items': [
    {
      'itemDescription': 'item 1',
    },
    {
      'itemDescription': 'item 2'
    },
    {
      'itemDescription': 'item 3'
    }
  ]
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
    List.deleteMany({}),
  ] );
});

describe( 'List endpoints', () => {

  it( '[GET] "/list" - it should get TWO lists with its respective items', async () => {

    const list1 = getBaseList( 1 );
    const list2 = getBaseList( 2 );

    // Create a list item.
    await Promise.all( [
      apiAxios.post( '/list', list1 ).catch( e => console.log( 'err', e ) ),
      apiAxios.post( '/list', list2 ).catch( e => console.log( 'err', e ) )
    ] );

    // Fetch all current lists.
    const { data: fetchedLists, status } = await apiAxios.get( '/list' )
      .catch( e => console.log( 'err', e ) );

    expect( fetchedLists.length ).toEqual( 2 );
    expect( status ).toEqual( 200 );

  });

  it( '[GET] "/list/:id" - it should get ONE list with its respective items', async () => {

    const list1 = getBaseList( 1 );

    // Create a list item.
    const { data: postedList } = await apiAxios
      .post( '/list', list1 ).catch( e => console.log( 'err', e ) );

    // Fetch a specific list.
    const { data: fetchedList, status } = await apiAxios.get( `/list/${postedList._id}` )
      .catch( e => console.log( 'err', e ) );

    expect( list1.title ).toEqual( fetchedList.title );
    expect( list1.items.length ).toEqual( fetchedList.items.length );
    expect( status ).toEqual( 200 );

  });

  it( '[POST] "/list" - it should register ONE list with its items', async () => {

    const list1 = getBaseList( 1 );

    // Create a list item.
    const { data: postedList, status } = await apiAxios
      .post( '/list', list1 ).catch( e => console.log( 'err', e ) );

    // Find the postedList in the DB to compare.
    const dbList = await List.findById( postedList._id ).populate( 'items' );

    expect( dbList.title ).toEqual( list1.title );
    expect( dbList.items.length ).toEqual( list1.items.length );
    expect( status ).toEqual( 200 );

  });

  it( '[PATCH] "/list" - it should edit an existing list and its items', async () => {

    const list1 = getBaseList( 1 );
    const modifiedList1 = getBaseList( 1 );
    modifiedList1.title = 'modified title 1';
    modifiedList1.items[0].itemDescription = 'modified item 1';

    // Remove one of the list items.
    modifiedList1.items.pop();

    // Create a list item.
    const { data: postedList } = await apiAxios
      .post( '/list', list1 ).catch( e => console.log( 'err', e ) );

    // Update list based on modified version.
    const { status } = await apiAxios
      .patch( `/list/${postedList._id}`, modifiedList1 )
      .catch( e => console.log( 'err', e ) );

    const dbList = await List.findById( postedList._id ).populate( 'items' );
    expect( dbList.title ).toEqual( modifiedList1.title );
    expect( dbList.items.length ).toEqual(  modifiedList1.items.length );
    expect( dbList.items[0].itemDescription ).toEqual( modifiedList1.items[0].itemDescription );
    expect( status ).toEqual( 200 );

  });

  it( '[DELETE] "/list" - it should delete the given list and its items', async () => {

    const list1 = getBaseList( 1 );

    // Create a list item.
    const { data: postedList } = await apiAxios
      .post( '/list', list1 ).catch( e => console.log( 'err', e ) );

    const dbListBeforeDelete = await List.findById( postedList._id ).populate( 'items' );
    expect( dbListBeforeDelete.title ).toEqual( list1.title );

    const [ countDbListsBeforeDeletion, countDbItemsBeforeDeletion ] = await Promise.all( [
      await List.countDocuments({}),
      await Item.countDocuments({}),
    ] );

    expect( countDbListsBeforeDeletion ).toEqual( 1 );
    expect( countDbItemsBeforeDeletion ).toEqual( list1.items.length );


    // Delete the list item.
    const { status } = await apiAxios
      .delete( `/list/${postedList._id}` ).catch( e => console.log( 'err', e ) );

    const [ countDbListsAfterDeletion, countDbItemsAfterDeletion ] = await Promise.all( [
      await List.countDocuments({}),
      await Item.countDocuments({}),
    ] );

    expect( countDbListsAfterDeletion ).toEqual( 0 );
    expect( countDbItemsAfterDeletion ).toEqual( 0 );
    expect( status ).toEqual( 200 );

  });

});
