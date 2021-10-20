import express from "express";

import { getFavorites, createFavorites, updateFavorites } from "../controllers/favoritesController.js";

const router = express.Router();

//Handling all the incoming requests
router.get('/', getFavorites);
router.post('/', createFavorites);
router.patch('/:id', updateFavorites);

export default router;