import express from "express";

import { getFavorites, createFavorites, updateFavorites, deleteFavoritesItem } from "../controllers/favoritesController.js";

const router = express.Router();

//Handling all the incoming requests
router.get('/', getFavorites);
router.post('/', createFavorites);
router.patch('/:id', updateFavorites);
router.patch('/favoriteItems/:id', deleteFavoritesItem);


export default router;