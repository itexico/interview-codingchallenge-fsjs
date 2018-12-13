import axios from 'axios';
import {TRAERLISTA, EXITOLISTA, FALLOLISTA, HEADER, EXITOEDITAR} from '../types/listasTypes.js';

export const traerLista = (id) => async(dispatch)=>{
	dispatch({type: TRAERLISTA})
	try{
		const response = await axios.get(`https://itexicomike.herokuapp.com/api/datos/${id}`);
		console.log(response.data)
		dispatch({type: EXITOLISTA, payload: response.data})
	}catch(error){
		dispatch({type: FALLOLISTA, payload: error.message});
	}
};



export const traerHeader = (id) => async(dispatch)=>{
	dispatch({type: TRAERLISTA})
	try{
		const response = await axios.get(`https://itexicomike.herokuapp.com/api/headers/${id}`);
		dispatch({type: HEADER, payload: response.data})
	}catch(error){
		dispatch({type: FALLOLISTA, payload: error.message});
	}
};


export const cambiar = (type , editado) => async(dispatch) =>{
	dispatch ({type, payload:editado})
};

export const Editar = (nombre, idHijo, idPadre, id, lista) => async(dispatch)=>{
	dispatch ({type: TRAERLISTA})
	try{
		let req = {nombre, idHijo}
		const response = await axios.post(`https://itexicomike.herokuapp.com/api/datos/${idPadre}/edit`, req);
		lista.splice(id,1);
		lista.unshift(response.data);
		dispatch({type: EXITOLISTA, payload:lista})
		console.log(lista ,' despues')
	}catch(error){
		dispatch({type: FALLOLISTA});
	}
};
/*Agregar un  nuevo elemento de la Lista, para esto necesito el eemento, y el padre, la lista la pido para agregarlo a la pantalla */
export const enviarDato = (nombre, lista, idPadre) => async (dispatch) => {
	if (nombre.trim() == '') {
		window.Materialize.toast('Dato Incompleto.', 5*1000, 'red');
	}else {
	dispatch ({type: TRAERLISTA});
	try {
		const req = {nombre};
		const response = await axios.post (`https://itexicomike.herokuapp.com/api/datos/${idPadre}`, req);
		lista.push(response.data);
		dispatch ({ type: EXITOLISTA, payload: lista});
	}
	catch(err) {
		dispatch ({type: FALLOLISTA, payload: err.message});
		window.Materialize.toast('Intente más tarde.', 5*1000, 'red');
	}}
};

export const deleteDato = (idHijo, id, lista) => async (dispatch) =>{
	dispatch({type: TRAERLISTA})
	try{
		const response = await axios.delete (`https://itexicomike.herokuapp.com/api/datos/${idHijo}`);
		lista.splice(id, 1);
		dispatch({type: EXITOLISTA, payload: lista})
	}catch(error){
		dispatch({type: FALLOLISTA, payload:error.message});
	}
};