const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const clinicInformation = new mongoose.Schema({
  clinicName: {
    type: String,
    require: true,
  },
  address: {
    type: String,
  },
  operationHours: [
    {
        type: String,
    }
  ],
  facilities: {
    type: String,
  },
  email: {
    type: String,
  },
  password:{
    type: String
  },
  bankInfo: {
      accountHolderName : { type : String},
      bankName : { type : String},
      IBAN : { type : String},
      accountNumber : { type : String},
      branchCode: { type : String},
    },
  operationDate: {
    type: String,
  },
  numberOfDoctors: {
    type: Number,
  },
  location: {
    lon: {
        type: Number
    },
    lat: {
        type: Number
    },
  },
  socialMediaInfo:{
    type : Object
  },
  lab:{
    type: Object
  },
  isApproved:{
    type: String,
    enum : ['PENDING','APPROVED','REJECTED'],
    default : "PENDING"
  },
  resetPassword: {
    type: Boolean,
    default: true,
  },
  activationDate:{
    type: Date,
  },
  file:{
    idCard : { type : String },
    businessLicence :  { type : String },
    image : { type : String }
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const ClinicInfo = mongoose.model("clinic", clinicInformation,'clinic');
module.exports = ClinicInfo;
