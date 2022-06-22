const { Schema, model } = require("mongoose");

const listFavSchema = new Schema(
  {
    titleList: {
      type: String,
      require: true,
      minlength: [2, "use a congruent title for the list"],
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
    items: [{ type: Schema.Types.ObjectId, ref: "Item", require: false }],
  },
  {
    timestamps: true,
  }
);

const ListFav = model("ListFav", listFavSchema);
module.exports = ListFav;
