import express from "express";

import { getFavorites } from "../controllers/favoritesController.js";

const router = express.Router();

//Handling all the incoming requests
router.get('/', getFavorites);
// router.post("/", favorites.ADD_FAVORITES);

export default router;