import express from "express";
import { signIn, signUp } from "../controllers/userController.js";

const router = express.Router();

//Handling all the incoming requests
router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;