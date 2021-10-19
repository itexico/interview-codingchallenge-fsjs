import express from "express";

import { getFavorites, createFavorites } from "../controllers/favoritesController.js";

const router = express.Router();

//Handling all the incoming requests
router.get('/', getFavorites);
router.post('/', createFavorites);

export default router;