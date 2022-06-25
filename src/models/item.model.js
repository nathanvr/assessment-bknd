const { Schema, model } = require("mongoose");
const ListFav = require("./listFav.model");

const itemSchema = new Schema(
  {
    itemTitle: {
      type: String,
      minlength: [2, "use a congruent title for the list"],
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    listFav: { type: Schema.Types.ObjectId, ref: "ListFav", require: true },
  },
  { timestamps: true }
);
itemSchema.pre("deleteOne", async function (next) {
  try {
    await ListFav.deleteMany({ items: this.getFilter()["_id"] });
  } catch (error) {
    next(error);
  }
});
const Item = model("Item", itemSchema);
module.exports = Item;
