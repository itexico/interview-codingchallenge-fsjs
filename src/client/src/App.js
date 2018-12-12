import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import CreateList from './components/List/CreateList'
import EditList from './components/List/Edit'
import showLists from './components/List/showLists'
import showStuffs from './components/Stuff/showStuffs'
import CreateStuff from './components/Stuff/CreateStuff'
import EditStuff from './components/Stuff/Edit'

class App extends Component {
  render () {
    return (
      <div className='container'>
        <div className='card' style={{textAlign: 'center'}}>
          <h1 className='card-header'>Lists of Stuffs</h1>
        </div>
        <Router>
          <Switch>
            <Route exact path='/' component={showLists} />
            <Route exact path='/list/' component={showLists} />
            <Route exact path='/list/showLists' component={showLists} />
            <Route path='/list/createList' component={CreateList} />
            <Route path='/list/edit/:id' component={EditList} />
            <Route exact path='/stuff/' component={showStuffs} />
            <Route path='/stuff/showStuffs' component={showStuffs} />
            <Route path='/stuff/createStuff' component={CreateStuff} />
            <Route path='/stuff/edit/:id' component={EditStuff} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
