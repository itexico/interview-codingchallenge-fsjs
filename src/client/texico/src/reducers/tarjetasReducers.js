import {
	TRAER, 
	EXITO, 
	FALLO,
	CAMBIONOMBRE,
	CAMBIODESC,
	CLEAR
} from '../types/tarjetasTypes.js';

const INITIAL_STATE ={
	tarjetas: [],
	cargando: false,
	error: '',
	nombre: '',
	descripcion: ''
};

export default (state = INITIAL_STATE, action)=>{
	switch(action.type){
		case TRAER: return{...state, cargando:true, error:''};
		case EXITO: return{...state, tarjetas: action.payload, cargando:false};
		case FALLO: return{...state, error: action.payload, cargando:false};
		case CAMBIONOMBRE: return{...state, nombre: action.payload};
		case CAMBIODESC: return{...state, descripcion: action.payload};
		case CLEAR: return{...state, nombre: '', descripcion: ''};
		default: return state;
	}
}