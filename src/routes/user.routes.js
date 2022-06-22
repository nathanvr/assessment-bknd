const router = require("express").Router();
const userCrontroller = require("../controllers/user.controller");
const { auth } = require("../utils/auth");

router.route("/register").post(userCrontroller.register);
router.route("/login").post(userCrontroller.login);
router.route("/user-list").get(auth, userCrontroller.show);

module.exports = router;
