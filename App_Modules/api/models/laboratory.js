const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const laboratoryInformation = new mongoose.Schema({
  labName: {
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
//   bankInfo: {
//       accountHolderName : { type : String},
//       bankName : { type : String},
//       IBAN : { type : String},
//       accountNumber : { type : String},
//       branchCode: { type : String},
//     },
//   operationDate: {
//     type: String,
//   },
  numberOfLabTechnican: {
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
    businessLicence :  { type : String },
    image : { type : String }
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const laboratoryInfo = mongoose.model("laboratory", laboratoryInformation,'laboratory');
module.exports = laboratoryInfo;
