const UserInfo = require("./user");
const AdminInfo = require("./admin");
const ClinicInfo =  require("./clinic")
const laboratoryInfo =  require("./laboratory")
const PhysicianInfo = require("./physician")
const PatientInfo = require("./patient")
module.exports = {
  UserInfo: UserInfo,
  AdminInfo:AdminInfo,
  ClinicInfo:ClinicInfo,
  laboratoryInfo:laboratoryInfo,
  PhysicianInfo : PhysicianInfo,
  PatientInfo:PatientInfo
};
