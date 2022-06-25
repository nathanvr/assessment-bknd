const { Schema, model, models } = require("mongoose");

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match: [emailRegex, "invalid email"],
      validate: {
        async validator(email) {
          try {
            const user = await models.User.findOne({ email });
            return !user;
          } catch (err) {
            return false;
          }
        },
        message: "Email already exist",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "password too short"],
    },
    listFavs: {
      type: [{ type: Schema.Types.ObjectId, ref: "ListFav" }],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
