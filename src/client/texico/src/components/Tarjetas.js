import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as tarjetasActions from '../actions/tarjetasActions'
import {Col, Card, Preloader,ProgressBar, Modal, Button} from 'react-materialize'


import {} from '../types/tarjetasTypes'

class Tarjetas extends Component{

	componentWillMount() {
		this.props.traerTarjetas();
	};

	desplegarTarjetas = () => (
		<div className="row">
			{this.props.tarjetas.map((elem, index)=>(
				<Col m={2} s={4} key={elem._id}>
				    <Card key={elem._id} className='blue-grey darken-1' textClassName='white-text' title={elem.nombre}  actions={[<a href={`/Lista/${elem._id}`}>Ver Lista</a>]} >
				    {elem.descripcion}
				    </Card>
				</Col>
				))
			}
		</div>
		);



	render(){
			return(
				<div className="container">
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