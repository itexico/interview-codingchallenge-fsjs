import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class TableRow extends Component {

  constructor (props) {
    super(props)
    this.delete = this.delete.bind(this)
  }

  async delete () {
   await axios.get('http://localhost:4000/lists/delete/' + this.props.obj._id)
      .then(res => alert(res.data))
 //     this.props.history.push('/list/showLists')
      .catch(err => console.log(err));
  }

  render () {
    return (
      <tr>
        <td>
          <Link to={"/stuff/showStuffs"}>
          {this.props.obj.list_name}
          </Link>
        </td>
        <td>
          <Link to={'/list/edit/' + this.props.obj._id} className='btn btn-primary' style={{marginRight: 20}}> Edit
          </Link>
          <button onClick={this.delete} className='btn btn-danger'>
            Delete
          </button>
        </td>
      </tr>
    )
  }
}


