import React, { Component } from 'react';
import List from './components/List';
import BtnAdd from '../src/components/ButtonAdd';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = { 
      data: [], 
      text: '' 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newList = {
      text: this.state.text,
      id: this.state.text.length
    };
    this.setState(state => ({
      data: state.data.push(newList),
      text: ''
    }));
  }

  render() {
    return (
      <div className="App">
        <h1> Technical challenge of Itexico </h1>
        <div className="div-input-add" onSubmit={this.handleSubmit}> 
          <input type="text" placeholder="Add a new list"
            onChange={this.handleChange}
            data={this.state.text}
          />
          <BtnAdd type="submit" onSubmit={this.handleSubmit}/>
        </div>
        <section className="container-lists">
          <List data={this.state.data}/>
        </section>
      </div>
    );
  }
}

export default App;
