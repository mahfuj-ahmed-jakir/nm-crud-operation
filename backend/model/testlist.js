const mongoose = require("mongoose");
const { Schema } = mongoose;

const testListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  officeTime: {
    type: String,
    required: true,
  },
  desgnation: {
    type: String,
    required: true,
  },
  dayOff: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const TestList = mongoose.model("testlist", testListSchema);

module.exports = TestList;
