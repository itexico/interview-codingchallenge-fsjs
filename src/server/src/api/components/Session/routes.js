import { Router } from "express";

import { Controller } from "./";
import Validator from "./validator";

const router = Router();

export const AuthoritationMiddleware = [
  ...Validator.authChecker,
  Controller.authMiddleware
];

/* GET Create a new Session */
router.get("/login", AuthoritationMiddleware, Controller.logIn);

/* GET Delete a Session */
router.get("/logout", AuthoritationMiddleware, Controller.getList);

/* POST Refresh a Token */
router.get(
  "/refresh/:token",
  Validator.checkRefreshSession,
  Controller.getItemFromList
);

export default router;
