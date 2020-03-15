import request from 'supertest';
import { app } from '../server';
import middleware from '../utils/auth';

describe('API', () => {
  describe('Auth cookie middleware', () => {
    const originalLog = console.log;
    let consoleOutput = [];
    const mockedLog = output => consoleOutput.push(output);
    beforeEach(() => (console.log = mockedLog));
    afterEach(() => {
      console.log = originalLog;
      consoleOutput = [];
    });

    test('should console log when auth cookie is present', done => {
      const req = { cookies: { auth: 'my_value12345' } };
      const res = {};
      const next = jest.fn();
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith();
      expect(consoleOutput).toEqual(
        expect.arrayContaining([
          `Auth cookie is present with the value: my_value12345`
        ])
      );
      done();
    });

    test('should NOT console log when other than auth cookie is present', done => {
      const req = { cookies: { other: 'my_value12345' } };
      const res = {};
      const next = jest.fn();
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith();
      expect(consoleOutput).toEqual(
        expect.not.arrayContaining([
          `Auth cookie is present with the value: my_value12345`
        ])
      );
      done();
    });

    test('should NOT console log when none cookies are present', done => {
      const req = {};
      const res = {};
      const next = jest.fn();
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith();
      expect(consoleOutput).toEqual(
        expect.not.arrayContaining([`Auth cookie is present with the value: `])
      );
      done();
    });
  });

  describe('Endpoints', () => {
    describe('List', () => {
      test('GET /list', async done => {
        const response = await request(app).get('/list');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([{ name: 'My first list' }]);
        done();
      });

      test('POST /list', async done => {
        const response = await request(app)
          .post('/list')
          .send({ name: 'My recently added list' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({ name: 'My recently added list' });
        done();
      });

      test('GET /list/:id', async done => {
        const response = await request(app).get('/list/' + global.listId);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({ name: 'My first list' });
        done();
      });

      test('PUT /list/:id', async done => {
        const response = await request(app)
          .put('/list/' + global.listId)
          .send({ name: 'My edited list' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({ name: 'My edited list' });
        done();
      });

      test('DELETE /list/:id', async done => {
        const response = await request(app).delete('/list/' + global.listId);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({ deletedCount: 1 });
        done();
      });
    });

    describe('Item', () => {
      test('GET /item', async done => {
        const response = await request(app).get('/item');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([
          { name: 'My first list item' },
          { name: 'My second list item' }
        ]);
        done();
      });

      test('POST /item', async done => {
        const response = await request(app)
          .post('/item')
          .send({ name: 'My recently added list item', list: global.listId });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
          name: 'My recently added list item'
        });
        done();
      });

      test('GET /item/:id', async done => {
        const response = await request(app).get('/item/' + global.itemId1);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
          name: 'My first list item'
        });
        done();
      });

      test('PUT /item/:id', async done => {
        const response = await request(app)
          .put('/item/' + global.itemId1)
          .send({ name: 'My edited list item' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
          name: 'My edited list item'
        });
        done();
      });

      test('DELETE /item/:id', async done => {
        const response = await request(app).delete('/item/' + global.itemId1);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({ deletedCount: 1 });
        done();
      });
    });
  });
});
