import React, { Component } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import Items from './components/Items';

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      name:[],
      items: []
    }

    this.writing = this.writing.bind(this);
    this.list = this.list.bind(this);
  }

  writing(e){
    this.setState({name:e.target.value});
    console.log(e.target.value);
  }

  list(e){
    e.preventDefault();
    console.log("holi");
    
  }



  render() {
    return (
              <div className="row">
                <div className="col-3">
                    <AddTask onSubmit={this.list} onChange={this.writing}/>
                    {/* <Items onSubmit={this.list} onKeyPress={this.writing} /> */}
                </div>
              </div>
    );
  }
}

export default App;
