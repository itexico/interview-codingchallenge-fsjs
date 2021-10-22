import express from "express";

import { getFavorites, createFavorites, updateFavorites, deleteFavoritesItem } from "../controllers/favoritesController.js";

import auth from "../middleware/auth.js"; //once valid user able to update 
const router = express.Router();

//Handling all the incoming requests
router.get('/', getFavorites);
router.post('/', createFavorites);
router.patch('/:id', updateFavorites);
router.patch('/favoriteItems/:id', deleteFavoritesItem);

export default router;