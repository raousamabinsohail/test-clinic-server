const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const physicianInformation = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  ID: {
    type: String,
  },
  address: {
    type: String,
  },
  DOB: {
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
  sex: {
    type: String,
    enum : ['Male','Female','Other']
  },
  socialMediaInfo:{
    type : Object
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
  clinics:[
    {
      type: Schema.Types.ObjectId,
      ref: "clinic"
    }
],
  file:{
    idCard : { type : String },
    medicalCertificate :  { type : String },
    image : { type : String }
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const physicianInfo = mongoose.model("physician", physicianInformation,'physician');
module.exports = physicianInfo;
