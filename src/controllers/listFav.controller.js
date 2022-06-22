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

  async show(req, res) {
    try {
      const { listId } = req.params;

      const list = await ListFav.findById(listId).populate(
        "items",
        "itemTitle description link"
      );
      res.status(200).json({ message: "list found", data: list });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
