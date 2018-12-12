import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class TableRow extends Component {

  constructor (props) {
    super(props)
    this.delete = this.delete.bind(this)
  }

  delete () {
    axios.get('http://localhost:4000/stuffs/delete/' + this.props.obj._id)
    .then(res => alert(res.data))
      .catch(err => console.log(err))
  }

  render () {
    return (
      <tr>
        <td>
          {this.props.obj.stuff_name}
        </td>
        <td>
          <Link to={'/stuff/edit/' + this.props.obj._id} className='btn btn-primary' style={{marginRight: 20}}> Edit
          </Link>
          <button onClick={this.delete} className='btn btn-danger'>
            Delete
          </button>
        </td>
      </tr>
    )
  }
}

 
