import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeStuffName = this.onChangeStuffName.bind(this);
    //this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    //this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      stuff_name: ''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/stuffs/edit/'+this.props.match.params.id)
          .then(response => {
            console.log(response)
              this.setState({ 
                stuff_name: response.data.stuff_name});
          })
          .catch(function (error) {
              console.log(error);
          })
    }

    onChangeStuffName(e) {
    this.setState({
      stuff_name: e.target.value
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const obj = {
      stuff_name: this.state.stuff_name
    };
    await axios.post('http://localhost:4000/stuffs/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/stuff/showStuffs');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Stuff</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>List Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.stuff_name}
                      onChange={this.onChangeStuffName}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Stuff" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}