const { model, Schema } = require("mongoose");

const user_schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  google_id: {
    type: String,
    required: true,
  },
});

const User = model("user", user_schema);
module.exports = User;
