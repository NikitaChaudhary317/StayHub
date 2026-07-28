const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);//for username and password

module.exports = mongoose.model("User", userSchema);