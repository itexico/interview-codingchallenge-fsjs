import React, { Component } from 'react';
import List from './components/List'

class App extends Component {

  constructor(){
    super()
    this.state = {
      listas:[]
    }
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/stuffs')
    .then(res => res.json())
    .then(lists => {
      lists.data.forEach(list => {
        let data = {
          id: list._id,
          name: list.name,
          categorie: list.categorie
        }
        this.setState({ listas: this.state.listas.concat([data]) }) // u.u)/ invoca el render de nuevo
        return 'banana'
      })
    })
  }


  render() {
    if( this.state.listas.length > 0) {
      return(
        <div>
          { this.state.listas.map(lista => <List key={lista.id} name = {lista.name} categorie = {lista.categorie}> </List>)}
        </div>
      )
    }
    return (
      <p>Cargando Listas</p> 
    )
  }
}

export default App;
