import React, { Component } from 'react';
import axios from 'axios';
//import { Redirect } from 'react-router';
//import $ from 'jquery'

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeListName = this.onChangeListName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel=this.onCancel.bind(this);

    this.state = {
      list_name: ''
      //stuff:[]
    }
  }

  onChangeListName(e) {
    this.setState({
      list_name: e.target.value
    });
  }

  onCancel(){
    this.props.history.push('/list/showLists')
  }

  async onSubmit(e) {
    e.preventDefault();
    const obj = {
      list_name: this.state.list_name
      //stuffs: this.state.stuff
    };
    console.log(JSON.stringify(obj))
    await axios.post('http://localhost:4000/lists/add', obj)
        .then(res => alert(res.data.list)
        );
        this.setState({
          list_name: ''
        })
         this.props.history.push('/list/showLists')
      }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
        
            <h3>Add New List</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>List Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.list_name}
                      onChange={this.onChangeListName}
                      />
                </div>
 
                <div className="form-group">
                    <input type="submit" value="Create List" className="btn btn-primary" style={{marginRight: 20}}/>
                    <input type="button" onClick={this.onCancel} value="Cancel" className="btn btn-danger"/>
                </div>
            </form>
        </div>
    )
  }
}