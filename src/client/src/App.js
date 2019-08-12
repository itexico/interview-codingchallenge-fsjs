import React, { Component } from 'react';
import './App.css';
import AddTask from './components/AddTask';

class App extends Component {
 
  render() {
    return (
              <div className="row">
                <div className="col-3">
                    <AddTask/>

                </div>
              </div>
    );
  }
}

export default App;
