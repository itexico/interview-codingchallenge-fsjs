import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchFavorites = () => API.get('/favorites');
export const createFavorites = (newFavorites) => API.post('/favorites', newFavorites);
export const updateFavorites = (id, updatedFavorites) => API.patch(`/ favorites / ${id} `, updatedFavorites);
export const deleteFavoritesItem = (id, newFavoriteItems) => API.patch(`/ favorites / favoriteItems / ${id} `, newFavoriteItems);

export const signIn = (formData) => API.post('/user/signIn', formData);
export const signUp = (formData) => API.post('/user/signUp', formData);
