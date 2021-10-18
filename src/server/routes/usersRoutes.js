const express = require("express");
const router = express.Router();
const { signIn } = require("../controller/user");

//Handling all the incoming requests
router.post("/login", signIn);

module.exports = router;