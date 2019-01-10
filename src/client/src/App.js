import React, { Component } from "react";
import Top from "./components/Top";
import List from "./components/List";
import Item from "./components/Item";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Top />
        <div className="row">
          <div className="col-md-6 separator">
            <List />
          </div>
          <div className="col-md-6">
            <Item />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
