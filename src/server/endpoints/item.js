const express = require("express");
const controller = require("../controllers/item");
const auth = require("../middleware/auth_cookie");

const router = express.Router();

router.get("/items/:listId", auth.validate, controller.readAll);
router.post("/item/:listId", auth.validate, controller.create);
router.get("/item/:id", auth.validate, controller.read);
router.put("/item/:id", auth.validate, controller.update);
router.delete("/item/:id", auth.validate, controller.destroy);

module.exports = router;
