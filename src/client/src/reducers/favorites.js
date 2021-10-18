import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (favorites = [], action) => {

    switch (action.type) {
        case FETCH_ALL:
            console.log(action.payload);
            return action.payload;
        case CREATE:
            return [...favorites, action.payload];
        case UPDATE:
            return favorites.map((post) => (post._id === action.payload._id ? action.payload : post));
        case DELETE:
            return favorites.filter((post) => post._id !== action.payload);
        default:
            return favorites;
    }

}