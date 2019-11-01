import React, {Component} from 'react';
import Header from './components/header/header.component';
import List from './components/list/list.component';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <List />
      </div>
    );
  }
}

export default App;

