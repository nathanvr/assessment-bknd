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

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("user or password incorrect ");
      }
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error("user or password incorrect");
      }

      const token = jwt.sign({ id: user._id }, "A5535M3NT", {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json({ token, message: "User login successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async show(req, res) {
    try {
      const id = req.user;
      const user = await User.findById(id)
        .select("-password")
        .populate({ path: "listFavs", select: "titleList" });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // async list(req, res) {
  //   try {
  //     const user = await User.find();
  //     res.status(200).json({ message: "users found", data: user });
  //   } catch (error) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },
};
