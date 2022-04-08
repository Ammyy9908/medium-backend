const { model, Schema } = require("mongoose");

const user_schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    social_id: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("user", user_schema);
module.exports = User;
