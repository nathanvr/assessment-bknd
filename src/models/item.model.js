const { Schema, model } = require("mongoose");

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

const Item = model("Item", itemSchema);
module.exports = Item;
