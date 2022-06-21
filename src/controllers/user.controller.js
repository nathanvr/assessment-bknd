const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body;

      const encPassword = await bcrypt.hash(password, 8);
      const user = await User.create({ email, password: encPassword });

      const token = jwt.sign({ id: user._id }, "A5535M3NT", {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json({ token, message: "User created successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
