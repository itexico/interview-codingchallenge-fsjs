import axios from 'axios';
import {TRAER, EXITO, FALLO, DETALLE} from '../types/tarjetasTypes.js';

export const traerTarjetas = () => async (displatch)  => {
	displatch({type: TRAER})
	try{
		const response = await axios.get('https://itexicomike.herokuapp.com/api/headers');
		displatch ({type: EXITO, payload: response.data})
	}catch(error){
		displatch({type: FALLO, payload: error.message});
	}
};

