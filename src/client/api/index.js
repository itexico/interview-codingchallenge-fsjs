import axios from 'axios';

const url = 'http://localhost:5000/favorites';

export const fetchFavorites = () => axios.get(url);