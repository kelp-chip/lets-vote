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
    default: Date.now(),
  },
  expireAfterSeconds: Number,
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;
