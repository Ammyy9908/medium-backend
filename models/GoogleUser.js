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

const GoogleUser = model("google_ser", user_schema);
module.exports = User;
