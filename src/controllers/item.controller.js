const ListFav = require("../models/listFav.model");
const Item = require("../models/item.model");

module.exports = {
  async create(req, res) {
    try {
      const { listId } = req.params;

      const listFav = await ListFav.findById(listId);

      const item = await Item.create({ ...req.body, listFav: listFav });
      listFav.items.push(item);
      await listFav.save({ validateBeforeSave: false });
      res.status(200).json({ message: "item created", data: item });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
