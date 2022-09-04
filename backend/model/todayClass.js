const mongoose = require("mongoose");
const { Schema } = mongoose;

const todayClassSchema = new Schema({
  batch: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  present: {
    type: String,
    required: true,
  },
});

const TodayClass = mongoose.model("todayclass", todayClassSchema);

module.exports = TodayClass;
