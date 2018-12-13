import {
	TRAERLISTA, 
	EXITOLISTA, 
	FALLOLISTA,
	HEADER,
	EDITAR,
	EXITOEDITAR,
	NUEVO
} from '../types/listasTypes.js';

const INITIAL_STATE ={
	lista: [],
	cargandolista: false,
	errorlista: '',
	header: {},
	editar: '',
	nuevo: ''
};

export default (state = INITIAL_STATE, action)=>{
	switch(action.type){
		case TRAERLISTA: return{...state, cargandolista:true, errorlista:''};
		case EXITOLISTA: return{...state, lista: action.payload, cargandolista:false, nuevo: '', editar: '' };
		case FALLOLISTA: return{...state, errorlista: action.payload, cargandolista:false};
		case HEADER: return{...state, header: action.payload};
		case EDITAR: return{...state, editar: action.payload};
		case NUEVO: return{...state, nuevo: action.payload};
		default: return state;
	}
}