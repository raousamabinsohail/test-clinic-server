const ClinicInfo = require("../../models/clinic");
const { ErrorHandler } = require("../../helpers/errorhandler");
const authHelper = require("../../helpers/auth.helper.js");
const mongoose = require("mongoose");
const { Console } = require("console");

const ClinicInfos = {
  
  registerClinic: async function (req, res, next) {
    try {
       const data = req.body;
       const { email, password } = req.body

      const userExists = await ClinicInfo.exists( {email : email })
      if(userExists) throw new ErrorHandler(404, "Clinic Data Already Exists..");

      
      // hash password
      const hashPassword = await authHelper.hashPassword(password);
      if (!hashPassword) {
        throw new ErrorHandler(500, "Partial Service Outage");
      }
      data.password = hashPassword;

       const scoreData = await new ClinicInfo(data);
        scoreData.save((error)=>{
        if(error) throw new ErrorHandler(404, "Data not saved..");
        else return res.status(202).json({msg:"Registered Successfully ... "});
      });
      } catch (error) {
      next(error);
    }
  },

  clinicLogin: async function (req, res, next) {
    try {
      const { email, password } = req.body;
      
      const userExist = await authHelper.isClinicExist(email);
      if (!userExist) {
        throw new ErrorHandler(404, "Clinic Doesn't Exist");
      }

      const isPasswordValid = await authHelper.validateClinicPassword(
        email,
        password
      );
      if (!isPasswordValid) {
        throw new ErrorHandler(401, "Invalid Password or Email");
      }

      const uid = await ClinicInfo.findOne({ email: email }, [
        "_id",
        "clinicName",
        "address",
        "numberOfDoctors",
        "isApproved"
      ]);
      if (!uid) {
        throw new ErrorHandler(404, "Internal Server Error");
      }

      if (!uid.isApproved) {
        return res.status(200).json({msg:"Clinic not Approved, please contact administrator"})
      }
     
      const tokens = authHelper.createJwtTokens(email, uid._id);
      
      const response = {
        token : tokens.accessToken,
        success: true,
        message: "Login Sucessfully",
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

};

module.exports = ClinicInfos;
