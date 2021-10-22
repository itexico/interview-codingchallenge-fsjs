import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (favorites = [], action) => {

    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...favorites, action.payload];
        case UPDATE:
            return favorites.map((favorite) => (favorite._id === action.payload._id ? action.payload : favorite));
        case DELETE:
            return favorites.filter((favorite) => favorite._id !== action.payload);
        default:
            return favorites;
    }

}