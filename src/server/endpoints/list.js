const express = require("express");
const controller = require("../controllers/list");
const auth = require("../middleware/auth_cookie");

const router = express.Router();

router.get("/lists", auth.validate, controller.readAll);
router.post("/list", auth.validate, controller.create);
router.get("/list/:id", auth.validate, controller.read);
router.put("/list/:id", auth.validate, controller.update);
router.delete("/list/:id", auth.validate, controller.destroy);

module.exports = router;
