const router = require("express").Router();
const { auth } = require("../utils/auth");
const listFavController = require("../controllers/listFav.controller");

router.route("/").post(auth, listFavController.create);

module.exports = router;
