// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    date: {
      type: String,
    },
    salary: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "employees",
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
