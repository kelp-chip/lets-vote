const mongoose = require("mongoose");
const uniqid = require("uniqid");

const PollSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function genUniqId() {
      return uniqid();
    },
  },
  name: String,
  choices: [{ value: String, score: { type: Number, default: 0 } }],
  createdAt: {
    type: Date,
    expires: 3600,
  },
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;
