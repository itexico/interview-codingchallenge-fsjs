import React, { Component } from 'react';
import List from './components/List'

class App extends Component {

  constructor(){
    super()
    this.state = {
      listas:[],
      name: '',
      categorie: ''

    }
    this.sendData = this.sendData.bind(this)
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

  sendData(e){
    e.preventDefault()
    fetch('http://localhost:3000/api/stuff',{
      method:'post',
      body: new FormData(e.target.parentNode)
    }).then(res => res.json()).then(json => console.log(json))
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    if( this.state.listas.length > 0) {
      return(
        <div>
          { this.state.listas.map(lista => <List key={lista.id} name = {lista.name} categorie = {lista.categorie}> </List>)}
          <form className="form-container">
            <input type="text" name="name" onChange={this.onChange} placeholder="Nombre de la lista"></input>
            <input type="text" name="categorie" onChange={this.onChange} placeholder="Categoría de la lista"></input>
            <input type="submit" value="Enviar" onClick={this.sendData}></input>
          </form> 
        </div>
      )
    }
    return (
      <p>Cargando Listas</p> 
    )
  }
}

export default App;
