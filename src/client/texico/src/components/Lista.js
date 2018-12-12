import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as listasActions from '../actions/listasActions'

import {Table, Input, Row, Icon, Button, Modal} from 'react-materialize';

import {EDITAR, NUEVO} from '../types/listasTypes.js'

class Lista extends Component{

componentWillMount() {
	 this.props.traerLista(this.props.match.params.idPadre);	
	 this.props.traerHeader(this.props.match.params.idPadre);	
}

handleChange = (event, propiedad) =>{
	this.props.cambiar(
		propiedad, event.target.value
	);
}

enviarEditado = (idHijo, id) => {
	let nueva = this.props.lista;
	console.log(id, 'id')
	this.props.Editar(this.props.editar, idHijo, this.props.match.params.idPadre, id, nueva);
};

enviarNuevo = () =>{
	this.props.enviarDato(this.props.nuevo, this.props.lista, this.props.match.params.idPadre);
}

eliminar = (id, index, lista) => {
	this.props.deleteDato(id, index, lista)
};

listado = () => (
	<Table>
	  <thead>
	    <tr>
	      <th >Elemento</th>
	      <th >Acciones</th>
	      <th >Eliminar</th>
	    </tr>
	  </thead>
	    <tbody>
	   	{this.props.lista.map((elem, index) =>( 		
	    <tr key={elem._id}>
	    	<td>{elem.nombre}</td>
	    	<td>
	    	<Modal header="Editar" fixedFooter trigger={<Button><Icon >autorenew</Icon></Button>}>
			  <Row s={3}><Input value={this.props.editar} onChange={(event)=>this.handleChange(event, EDITAR)}/>
			  <Button onClick={() => this.enviarEditado(elem._id, index)}>
			  	Enviar
			  </Button>
			  </Row>
			</Modal>
	    	</td>
	    	<td>
	    		<Button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.eliminar(elem._id, index, this.props.lista) }} >
	    			<Icon > delete</Icon>
	    		</Button>

	    	</td>
	    </tr>
	   	))}
	   </tbody>
	</Table>
);

render(){
		return(
			<div className="container">
			<h1>{this.props.header.nombre}</h1> 
			<h4>{this.props.header.descripcion}</h4> 
			 <Row>
			 <Button onClick={this.enviarNuevo}> add</Button>
			 <Input s={5}  value={this.props.nuevo} onChange={(event)=>this.handleChange(event, NUEVO)}/></Row>
			{this.listado()}
			</div>
		);
	}

}
const mapStateToProps = ({listasReducers}) =>{
	return listasReducers;
}

export default connect(mapStateToProps, listasActions)(Lista)