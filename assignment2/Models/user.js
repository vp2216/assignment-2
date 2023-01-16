const db = require("mongoose");
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique : true },
  password: { type: String, required: true, min : 6 },
});

const userModel = db.model("User", userSchema);

module.exports = userModel;