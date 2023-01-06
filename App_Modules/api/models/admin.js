const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const adminInformation = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 3,
    max: 255,
  },
  cnic: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    min: 6,
    max: 500,
    require: true,
  },
  phone: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const AdminInfo = mongoose.model("admin", adminInformation);
module.exports = AdminInfo;
