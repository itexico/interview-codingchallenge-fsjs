import {
	TRAER, 
	EXITO, 
	FALLO,
} from '../types/tarjetasTypes.js';

const INITIAL_STATE ={
	tarjetas: [],
	cargando: false,
	error: '',
};

export default (state = INITIAL_STATE, action)=>{
	switch(action.type){
		case TRAER: return{...state, cargando:true, error:''};
		case EXITO: return{...state, tarjetas: action.payload, cargando:false};
		case FALLO: return{...state, error: action.payload, cargando:false};
		default: return state;
	}
}