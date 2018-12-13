import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as tarjetasActions from '../actions/tarjetasActions'

import {Row, Col, Card, Preloader, Modal, Button, Input, Icon} from 'react-materialize'


import {CAMBIONOMBRE, CAMBIODESC} from '../types/tarjetasTypes'

class Tarjetas extends Component{

	componentWillMount() {
		this.props.traerTarjetas();
	};

	eliminar = (id, index, tarjetas) => {
		this.props.eliminarHeader(id, index, tarjetas);
	};

	desplegarTarjetas = () => (
		<Row >
			{this.props.tarjetas.map((elem, index)=>(
				<Col m={3} key={elem._id}>
				    <Card key={elem._id} className='blue-grey darken-1 card' textClassName='white-text' title={elem.nombre}  actions={[<a href={`/Lista/${elem._id}`}>Ver Lista</a>,<Button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.eliminar(elem._id, index, this.props.tarjetas) }} ><Icon > delete</Icon></Button>]} >
				    {elem.descripcion}
				    </Card>
				</Col>
				))
			}
		</Row>
		);

	handleChange = (event, propiedad) =>{
	this.props.cambiar(
		propiedad, event.target.value
	);
	
	}

	enviar = () => {
		const obj = {nombre: this.props.nombre, descripcion: this.props.descripcion}
		this.props.nombre.trim() == '' ? window.Materialize.toast('Favor de insertar nombre', 2000, 'red') : this.props.enviarHeader(obj, this.props.tarjetas);
	};

	render(){
		return(
			<div className="container">
				<h1 >Listas</h1> 		
				<Row>
					<Input label="Nombre Lista" s={4} value={this.props.nombre}  onChange={(event)=> this.handleChange(event, CAMBIONOMBRE)}/>
   					<Input s={4} label="Descripcion (Opcional)" value={this.props.descripcion} onChange={(event)=> this.handleChange(event, CAMBIODESC)}/>
   				    <Button waves='light'onClick={this.enviar}>add<Icon left>cloud</Icon></Button>
				</Row>
				{this.props.tarjetas ? this.desplegarTarjetas() : ''}
				{this.props.cargando ?   <div className="center"><Preloader flashing /></div> : '' }
			</div> 
		);
	}

}
const mapStateToProps = ({tarjetasReducers}) =>{
	return tarjetasReducers;
}

export default connect(mapStateToProps, tarjetasActions)(Tarjetas)