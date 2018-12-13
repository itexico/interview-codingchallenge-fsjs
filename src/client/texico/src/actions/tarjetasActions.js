import axios from 'axios';
import {TRAER, EXITO, FALLO, DETALLE,CAMBIONOMBRE, CAMBIODESC, CLEAR} from '../types/tarjetasTypes.js';

export const traerTarjetas = () => async (dispatch)  => {
	dispatch({type: TRAER})
	try{
		const response = await axios.get('https://itexicomike.herokuapp.com/api/headers');
		dispatch ({type: EXITO, payload: response.data})
	}catch(error){
		dispatch({type: FALLO, payload: error.message});
	}
};

export const cambiar = (type , editado) => async(dispatch) =>{
	dispatch ({type, payload:editado})
};

export const enviarHeader = (body, headers) => async(dispatch) => {
	console.log(body)
	dispatch({type: TRAER});
	let req = {body}
	try{
		const response = await axios.post('https://itexicomike.herokuapp.com/api/headers', body)
		headers.push(response.data);
		dispatch({type: EXITO, payload: headers});
		dispatch({type: CLEAR})
	}catch(error){
		dispatch({type:FALLO, payload: error.message})
	}
};

export const eliminarHeader = (id, index , tarjetas) => async(dispatch) => {
	dispatch({type: TRAER});
	try{
		const response = await axios.delete(`https://itexicomike.herokuapp.com/api/headers/${id}`)
		tarjetas.splice(index,1);
		dispatch ({type: EXITO, payload: tarjetas})
	}catch(error){
		dispatch({type: FALLO, payload: error.message})
	}
};