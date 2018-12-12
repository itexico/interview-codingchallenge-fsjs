import { combineReducers } from 'redux';
import tarjetasReducers from './tarjetasReducers';
import listasReducers from './listasReducers'

export default combineReducers({
	tarjetasReducers,
	listasReducers
});
