const mongoose = require("mongoose");

const queSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: false,
    },
    IDType: {
      type: String,
      required: true,
      unique: false,
    },
    IDNumber: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    queData: {
      type: [queSchema],
      required: false,
      unique: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
