const { Schema, model, models } = require("mongoose");

const passRegex = new RegExp(
  "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
);
const emailRegex = new RegExp(
  "[a-z0-9._-]*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?[.])+[a-z0-9]{2,}"
);

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
      match: [passRegex, "password insecure"],
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
