import express from "express";
import { getAllFavorites } from "../controllers/favoritesController.js";
const router = express.Router();


//Handling all the incoming requests
router.get("/", getAllFavorites);
// router.post("/", favorites.ADD_FAVORITES);

export default router;
// module.exports = router;