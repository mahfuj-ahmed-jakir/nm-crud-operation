const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeListSchema = new Schema({
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
});

const EmployeList = mongoose.model("employelist", employeListSchema);

module.exports = EmployeList;
