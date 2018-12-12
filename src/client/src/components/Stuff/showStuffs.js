import React, { Component } from 'react'
import axios from 'axios'
import TableRow from './TableRow'

export default class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {stuff: []}
  }
  componentDidMount () {
    axios.get('http://localhost:4000/stuffs')
      .then(response => {
        this.setState({ stuff: response.data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  tabRow () {
    return this.state.stuff.map(function (object, i) {
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
              <a className='nav-link' href='/stuff/createStuff'>Add Stuff</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/stuff/showStuffs'>All Stuffs</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/list/showLists'>All Lists</a>
            </li>
          </ul>
          <table className='table table-striped' style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>
                  Stuffs
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
