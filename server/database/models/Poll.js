const mongoose = require("mongoose");
import uniqid from "uniqid";

const PollSchema = new mongoose.Schema({
  id: {
    type: String,
    default: function genUniqId() {
      return uniqid();
    },
  },
  name: String,
  choices: [{ name: String, score: { type: Number, default: 0 } }],
  createdAt: { type: Date, expires: 60 },
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;

//43200 - 1 day
//302400 - 1 week
//3600 - 1 hour
