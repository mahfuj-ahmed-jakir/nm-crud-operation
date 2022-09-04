const mongoose = require("mongoose");
const { Schema } = mongoose;

const postActivitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const PostActivity = mongoose.model("postactivity", postActivitySchema);

module.exports = PostActivity;
