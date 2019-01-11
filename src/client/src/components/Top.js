import React, { Component } from "react";

class Top extends Component {
  render() {
    return (
      <div className="top">
        <blockquote className="blockquote text-center">
          <h1 className="display-3 ">Lists App</h1>
          <footer className="blockquote-footer white-quote">
            A <cite title="MongoDB Express React Node.js">MERN</cite> Code
            Challenge :)
          </footer>
        </blockquote>
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-center">Lists</h1>
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Items</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Top;
