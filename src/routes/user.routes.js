const router = require("express").Router();
const userCrontroller = require("../controllers/user.controller");

router.route("/register").post(userCrontroller.register);

module.exports = router;
