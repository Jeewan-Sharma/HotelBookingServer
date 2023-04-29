const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema(
  {
    testname: {
      type: String,
      required: true,
      unique: true,
    },
    testemail: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Test", TestSchema);
