import axios from 'axios';

const url = 'http://localhost:5000/favorites';

export const fetchFavorites = () => axios.get(url);
export const createFavorites = (newFavorites) => axios.post(url, newFavorites);