const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  mail: { type: String, required: true, unique: false },
});

const Mail = mongoose.model("Mail", mailSchema);

module.exports = Mail;
