var mongoose = require("mongoose");

var Stuff = require('../app_api/models/stuffs');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('stuffs', () => {
	beforeEach((done) => { //Before each test we empty the database
		Stuff.remove({}, (err) => {
		   done();
		});
	});
 /*
  * Test the /GET route
  */
  describe('/GET stuffs', () => {
	  it('it should GET all the stuffs', (done) => {
			chai.request('http://localhost:3000')
		    .get('/api/stuffs')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });

  /*
  * Test the /POST route
  */
  describe('/POST stuff', () => {
	  it('it should not POST a stuff', (done) => {
	  	var stuff = {
	  		name: "movies"
	  	};
			chai.request('http://localhost:3000')
		    .post('/api/stuffs')
		    .send(book)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('_id').eql(stuff._id);
		      done();
		    });
	  });
  });

  /*
  * Test the /stuffs/:stuffid route
  */
  describe('/stuffs/:stuffid stuff', () => {
	  it('it should GET a stuff by the given id', (done) => {
      var stuff = {
        name: "movies"
      };
	  	Stuff.save((err, stuff) => {
	  		chai.request(server)
		    .get('/api/stuffs/' + stuff._id)
		    .send(stuff)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('name');
			  	res.body.should.have.property('_id').eql(stuff._id);
		      done();
		    });
	  	});

	  });
  });


});
