const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const filesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);
const Files = mongoose.model("files", filesSchema);
module.exports = Files;
