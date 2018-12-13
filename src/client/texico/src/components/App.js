import React, { Component } from 'react';
import  './index.css'
import {Route, BrowserRouter} from 'react-router-dom';
  
import Header from './Header';
import Tarjetas from './Tarjetas'
import Lista from './Lista'
import Footer from './Footer'
class App extends Component {
  render() {
    return (
      <div>
	      	<BrowserRouter>
	      		<div>
        			<Header/>
              <Route exact path = '/' component= {Tarjetas}/>
	      			<Route exact path = '/Lista/:idPadre' component= {Lista}/>
	      		   <Footer/>
            </div>
	      	</BrowserRouter>
      </div>
    );
  }
}

export default App;
