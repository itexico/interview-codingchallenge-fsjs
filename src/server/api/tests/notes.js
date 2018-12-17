process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Note = require("../models/note");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Notes", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Note.deleteMany({}, err => {
      done();
    });
  });

  // -------------------
  // Test the /GET Route
  // -------------------
  describe("/GET notes", () => {
    // no notes created
    it("it should GET an empty list when there are no notes created", done => {
      chai
        .request(server)
        .get("/notes")
        .set('Cookie', 'auth=')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.notes.should.be.a("array");
          res.body.count.should.be.eql(0);
          done();
        });
    });

    // two notes created
    it("it should GET all notes created", done => {
      let note1 = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: "Movies",
        items: ["TLOR", "HP"]
      });
      let note2 = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: "Sports",
        items: ["Football", "Swimming"]
      });
      note1.save().then(result1 => {
        note2.save().then(result2 => {
          chai
            .request(server)
            .get("/notes")
            .set('Cookie', 'auth=')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.notes.should.be.a("array");
              res.body.count.should.be.eql(2);
              done();
            });
        });
      });
    });
  });

  // --------------------
  // Test the /POST Route
  // --------------------
  describe("/POST note", () => {
    // note without title field
    it("it should not POST a note without title field", done => {
      let note = {
        items: ["Mars, Jupiter, Earth"]
      };
      chai
        .request(server)
        .post("/notes")
        .set('Cookie', 'auth=')
        .send(note)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.error.errors.title.should.have
            .property("kind")
            .eql("required");
          done();
        });
    });

    // note with title but without items field
    it("it should POST a note with title and without items field", done => {
      let note = {
        title: "Planets"
      };
      chai
        .request(server)
        .post("/notes")
        .set('Cookie', 'auth=')
        .send(note)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have
            .property("message")
            .eql("Note created successfully!");
          res.body.createdNote.should.have.property("title").eql("Planets");
          res.body.createdNote.should.have.property("items").eql([]);
          done();
        });
    });

    // note with title and items fields
    it("it should POST a note with title and items fields", done => {
      let note = {
        title: "Planets",
        items: ["Mars", "Jupiter", "Earth"]
      };
      chai
        .request(server)
        .post("/notes")
        .set('Cookie', 'auth=')
        .send(note)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have
            .property("message")
            .eql("Note created successfully!");
          res.body.createdNote.should.have.property("title").eql("Planets");
          res.body.createdNote.should.have
            .property("items")
            .eql(["Mars", "Jupiter", "Earth"]);
          done();
        });
    });

    // note extra invalid field
    it("it should POST a note discarding invalid fields", done => {
      let note = {
        title: "Planets",
        items: ["Mars", "Jupiter", "Earth"],
        favItem: "Mars"
      };
      chai
        .request(server)
        .post("/notes")
        .set('Cookie', 'auth=')
        .send(note)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have
            .property("message")
            .eql("Note created successfully!");
          res.body.createdNote.should.have.property("title").eql("Planets");
          res.body.createdNote.should.have
            .property("items")
            .eql(["Mars", "Jupiter", "Earth"]);
          res.body.createdNote.should.not.have.property("favItem");
          done();
        });
    });
  });

  // ---------------------------
  // Test the /GET/:noteId Route
  // ---------------------------
  describe("/GET/:noteId note", () => {
    // should find a note with a correct id
    it("it should GET a note by the given id", done => {
      let note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: "Movies",
        items: ["TLOR", "HP"]
      });
      note.save().then(result => {
        chai
          .request(server)
          .get("/notes/" + note._id)
          .set('Cookie', 'auth=')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("Note found!");
            res.body.should.have.property("note");
            res.body.note.should.have.property("title");
            res.body.note.should.have.property("items");
            res.body.note.should.have.property("_id");
            done();
          });
      });
    });

    // should not find a note with an incorrect id
    it("it should not GET a note by a wrong id", done => {
      let note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: "Movies",
        items: ["TLOR", "HP"]
      });
      let newId = new mongoose.Types.ObjectId();
      note.save().then(result => {
        chai
          .request(server)
          .get("/notes/" + newId)
          .set('Cookie', 'auth=')
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property("message").eql("Invalid ID for note");
            done();
          });
      });
    });
  });

  // ---------------------------
  // Test the /PATCH/:noteId Route
  // ---------------------------
  describe("/PATCH/:noteId note", () => {
    // should update a note with title and items fields given
    it("it should UPDATE a note by ID, with title and items fields given", done => {
      let note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: "Movies",
        items: ["TLOR", "HP"]
      });
      let fieldsUpdated = {
        title: "Planets",
        items: ["Mars", "Earth"]
      };
      note.save().then(result => {
        chai
          .request(server)
          .patch("/notes/" + note._id)
          .set('Cookie', 'auth=')
          .send(fieldsUpdated)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have
              .property("message")
              .eql("Note updated successfully!");
            chai
              .request(server)
              .get("/notes/" + note._id)
              .set('Cookie', 'auth=')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message").eql("Note found!");
                res.body.should.have.property("note");
                res.body.note.should.have
                  .property("title")
                  .eql(fieldsUpdated.title);
                res.body.note.should.have
                  .property("items")
                  .eql(fieldsUpdated.items);
              });
            done();
          });
      });
    });

    // should update a note with only items given
    it("it should UPDATE a note by ID, with only items given", done => {
      let note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: "Movies",
        items: ["TLOR", "HP"]
      });
      let fieldsUpdated = {
        items: ["Mars", "Earth"]
      };
      note.save().then(result => {
        chai
          .request(server)
          .patch("/notes/" + note._id)
          .set('Cookie', 'auth=')
          .send(fieldsUpdated)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have
              .property("message")
              .eql("Note updated successfully!");
            chai
              .request(server)
              .get("/notes/" + note._id)
              .set('Cookie', 'auth=')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message").eql("Note found!");
                res.body.should.have.property("note");
                res.body.note.should.have.property("title").eql(note.title);
                res.body.note.should.have
                  .property("items")
                  .eql(fieldsUpdated.items);
                done();
              });
          });
      });
    });

    // should update a note with only title given
    it("it should UPDATE a note by ID, with only title given", done => {
      let note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: "Movies",
        items: ["TLOR", "HP"]
      });
      let fieldsUpdated = {
        title: "Planets"
      };
      note.save().then(result => {
        chai
          .request(server)
          .patch("/notes/" + note._id)
          .set('Cookie', 'auth=')
          .send(fieldsUpdated)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have
              .property("message")
              .eql("Note updated successfully!");
            chai
              .request(server)
              .get("/notes/" + note._id)
              .set('Cookie', 'auth=')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message").eql("Note found!");
                res.body.should.have.property("note");
                res.body.note.should.have
                  .property("title")
                  .eql(fieldsUpdated.title);
                res.body.note.should.have.property("items").eql(note.items);
                done();
              });
          });
      });
    });
  });

  // ------------------------------
  // Test the /DELETE/:noteId Route
  // ------------------------------
  describe("/DELETE/:id note", () => {
    it("it should DELETE a note given the id", done => {
      let note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: "Movies",
        items: ["TLOR", "HP"]
      });
      note.save().then(result => {
        chai
          .request(server)
          .del("/notes/" + note._id)
          .set('Cookie', 'auth=')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have
              .property("message")
              .eql("Note deleted successfully!");
            chai
              .request(server)
              .get("/notes")
              .set('Cookie', 'auth=')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.count.should.be.eql(0);
                done();
              });
          });
      });
    });
  });
});
