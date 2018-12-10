import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeListName = this.onChangeListName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      list_name: ''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/lists/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                list_name: response.data.list_name});
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeListName(e) {
    this.setState({
      list_name: e.target.value
    });
  }
  
  async onSubmit(e) {
    e.preventDefault();
    const obj = {
      list_name: this.state.list_name
    };
    await axios.post('http://localhost:4000/lists/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/list/showLists');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update List</h3>
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
                    <input type="submit" 
                      value="Update List" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}