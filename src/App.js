import React, { Component } from 'react';
import List from './components/List';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Technical challenge of Itexico </h1>
        <section className="container-lists">
          <input type="text" placeholder="Add a new list"></input>
          <List/>
        </section>
      </div>
    );
  }
}

export default App;
