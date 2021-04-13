const chai = require('chai');
const chaiHttp = require('chai-http');

const server = 'http://localhost:7000';

let should = chai.should();

chai.use(chaiHttp);

// List test

describe('GET /api/lists/', function () {
  it('respond with all the lists', function () {
    chai
      .request(server)
      .get('/api/lists')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
      });
  });
});

describe('GET /api/lists/:id', function () {
  it('respond with list id', function () {
    chai
      .request(server)
      .get('/api/lists/60753ad56bdbcf08da1a5ce0')
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});

describe('POST /api/lists', function () {
  it('post the data list', function () {
    chai
      .request(server)
      .post('/api/lists')
      .send({
        title: 'My favorite apps',
        description: 'List to add/view/update/delete my favorite apps.',
        category: 'apps',
      })
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});

describe('PUT /api/lists/:id', function () {
  it('update the data list', function () {
    chai
      .request(server)
      .put('/api/lists/60753a6f6bdbcf08da1a5cda')
      .send({
        title: 'My favorite songs',
        description: 'List to add/view/update/delete my favorite songs.',
        category: 'songs',
      })
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});

describe('DELETE /api/lists/:d', function () {
  it('delete list with specific id', function () {
    chai
      .request(server)
      .del('/api/lists/607520b06bdbcf08da1a5ccf')
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});

// Items test

describe('GET /api/lists/:id/items', function () {
  it('respond with all the items for the list', function () {
    chai
      .request(server)
      .get('/api/lists/6072afde75b0bfb39114bf7f/items')
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});

describe('GET /api/lists/:id/items/:id', function () {
  it('respond with an specific item from a list', function () {
    chai
      .request(server)
      .get('/api/lists/607520b06bdbcf08da1a5ccf/items/60752f736bdbcf08da1a5cd7')
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});

describe('POST /api/lists/:id/items', function () {
  it('post the data list', function () {
    chai
      .request(server)
      .post('/api/lists/607520b06bdbcf08da1a5ccf/items')
      .send({
        title: 'The Devil Wears Prada',
        featuredImage: 'https://i.ytimg.com/vi/cLA86Bjmnmg/maxresdefault.jpg',
        description: 'This is the heavist albumn in the whole music world.',
      })
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});

describe('PUT /api/lists/:id/items/:id', function () {
  it('update the data item list', function () {
    chai
      .request(server)
      .put('/api/lists/6072afde75b0bfb39114bf7f/items/60752f9b6bdbcf08da1a5cd8')
      .send({
        title: 'My favorite songs',
        description: 'List to add/view/update/delete my favorite songs.',
        featuredImage:
          'https://res.cloudinary.com/bluecatencode/image/upload/v1604417128/default_profile_glpauv.png',
      })
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});

describe('DELETE /api/lists/:id/items/:id', function () {
  it('delete item list with specific id', function () {
    chai
      .request(server)
      .del('/api/lists/6072afde75b0bfb39114bf7f/items/60752f9b6bdbcf08da1a5cd8')
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});
