import React, { Component } from 'react'
import axios from 'axios'
import TableRow from './TableRow'

export default class showLists extends Component {

  constructor (props) {
    super(props)
    this.state = {list: []}
  }

  componentDidMount () {
    axios.get('http://localhost:4000/lists')
      .then(response => {
        this.setState({ list: response.data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  tabRow () {
    return this.state.list.map(function (object, i) {
      return <TableRow obj={object} key={i} />
    })
  }

  render () {
    return (
      <div className='tab-content' id='nav-tabContent'>
        <div
          className='tab-pane fade  show active'
          id='nav-profile'
          role='tabpanel'
          aria-labelledby='nav-profile-tab'>
          <ul className='nav nav-tabs'>
            <li className='nav-item'>
              <a className='nav-link' href='/list/createList'>Add List</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/list/showLists'>All Lists</a>
            </li>
          </ul>
          <table className='table table-striped' style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>
                  List Name
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
