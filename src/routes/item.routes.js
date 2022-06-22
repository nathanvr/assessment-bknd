const router = require("express").Router();
const { auth } = require("../utils/auth");
const itemController = require("../controllers/item.controller");

router.route("/:listId").post(auth, itemController.create);

module.exports = router;
