import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeListName = this.onChangeListName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel=this.onCancel.bind(this);
    this.state = {
      stuff_name: '',
    }
  }

  onChangeListName(e) {
    this.setState({
      stuff_name: e.target.value
    });
  }

  onCancel(){
    this.props.history.push('/stuff/showStuffs')
  }

  async onSubmit(e) {
    e.preventDefault();
    const obj = {
      stuff_name: this.state.stuff_name
    };
    await axios.post('http://localhost:4000/stuffs/add', obj)
        .then(res => alert(res.data.list)
        );
        this.setState({
          stuff_name: ''
        })
         this.props.history.push('/stuff/showStuffs')
      }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Add New Stuff</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Stuff Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.stuff_name}
                      onChange={this.onChangeListName}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" value="Add Stuff" className="btn btn-primary" style={{marginRight: 20}}/>
                    <input type="button" onClick={this.onCancel} value="Cancel" className="btn btn-danger"/>
                </div>
            </form>
        </div>
    )
  }
}