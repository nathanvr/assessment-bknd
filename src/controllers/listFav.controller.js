const User = require("../models/user.model");
const ListFav = require("../models/listFav.model");

module.exports = {
  async create(req, res) {
    try {
      const userId = req.user;
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User invalid");
      }
      const listFav = await ListFav.create({ ...req.body, user: user });
      user.listFavs.push(listFav);
      await user.save({ validateBeforeSave: false });
      res.status(200).json({ message: "list created", data: listFav });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //   async list(req, res) {
  //     try {
  //       const listFav = await ListFav.find();
  //       res.status(200).json({ message: "find lists", data: listFav });
  //     } catch (error) {
  //       res.status(400).json(error);
  //     }
  //   },
};
