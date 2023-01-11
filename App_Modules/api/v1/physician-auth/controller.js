const PhysicianInfoModel = require("../../models/physician");
const { ErrorHandler } = require("../../helpers/errorhandler");
const authHelper = require("../../helpers/auth.helper.js");
const { mailer } = require("../../helpers/mailer")

const ClinicInfos = {
  
  registerLab: async function (req, res, next) {
    try {
       const data = req.body;
       const { email } = req.body
      
      const userExists = await PhysicianInfoModel.exists( {email : email })
      if(userExists) throw new ErrorHandler(404, "Physician Data Already Exists..");

      const scoreData = await new PhysicianInfoModel(data);
        scoreData.save((error)=>{
            if(error) throw new ErrorHandler(404, "Data not saved..");
         });
         mailer( {
          subject: "Welcome Mail",
          template : 'email',
          context: {
            email: email,
            text : `Thank you for signup. Once your Account approves we will send password`,
            heading : "Welcome to Medicare xChain"
          }});
      return res.status(202).json({msg:"Registered Successfully ... "});
      } catch (error) {
      next(error);
    }
  },

  clinicLogin: async function (req, res, next) {
    try {
      const { email, password } = req.body;
      
      const userExist = await authHelper.isPhysicianExist(email);
      if (!userExist) {
        throw new ErrorHandler(404, "Physician Doesn't Exist");
      }

      const isPasswordValid = await authHelper.validatePhysicianPassword(
        email,
        password
      );
      if (!isPasswordValid) {
        throw new ErrorHandler(401, "Invalid Password or Email");
      }

      const uid = await PhysicianInfoModel.findOne({ email: email }, [
        "_id",
        "name",
        "address",
        "DOB",
        "ID",
        "sex",
        "isApproved",
        "resetPassword"
      ]);
      if (!uid) {
        throw new ErrorHandler(404, "Internal Server Error");
      }

      if (!uid.isApproved) {
        return res.status(200).json({msg:"Physician not Approved, please contact administrator"})
      }
     
      const tokens = authHelper.createJwtTokens(email, uid._id);
      
      const response = {
        token : tokens.accessToken,
        success: true,
        message: "Login Sucessfully",
        physicianInfo : uid
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  getAllClinics: async function (req, res, next) {
    try {
      // Pagination variables
      const page = Number(req.query.page) || 1;
      const offset = Number(req.query.offset) || 10;
      const skip = page * offset - offset;
      const query = req.body;


      const totalData = await PhysicianInfoModel.countDocuments(query);
      const data = await PhysicianInfoModel.find(query)
        .lean()
        .limit(offset)
        .skip(skip)
        .sort({ createdDate: -1 });

      res.json({
        msg: "Clinics fetched Successfully",
        data: data,
        total: totalData,
      });
    } catch (error) {
      next(error);
    }
  },


  activateClinic: async function (req, res, next) {
    try {
      const uid = req.params.id;

       //checking the validity of request
       const clinicData = await PhysicianInfoModel.findById(uid).select('email')
       if(!clinicData) throw new ErrorHandler(400, "Invalid Physician Id !");
       

       const password = await authHelper.generatePassword()

       // hash password
       const hashPassword = await authHelper.hashPassword(password);
       if (!hashPassword) {
         throw new ErrorHandler(500, "Partial Service Outage");
       }
 
       const date = new Date()
       const data = {
        isApproved : true,
        password : hashPassword,
        resetPassword : true,
        activationDate : date
      };
      const isUpdated = await PhysicianInfoModel.updateOne(
        { _id: uid },
        { $set: data }
      );
      if (!isUpdated) {
        throw new ErrorHandler(400, "Physician Not Activated");
      }
      mailer({
        subject: "Account Approvde",
        template : 'email',
        context: {
          email: clinicData.email,
          text: `Email : ${clinicData.email}  Password: ${password}`,
          heading : "Login credentials"
        }
       })
      res.json({ msg: "Physician Activated Successfully !" });
    } catch (error) {
      next(error);
    }
  },

  rejectClinic: async function (req, res, next) {
    try {
      const uid = req.params.id;

       //checking the validity of request
       const clinicData = await PhysicianInfoModel.findById(uid).select('email')
       if(!clinicData) throw new ErrorHandler(400, "Invalid Physician Id !");

       const date = new Date()
       const data = {
        isApproved : false,
        activationDate : date
      };
      const isUpdated = await PhysicianInfoModel.updateOne(
        { _id: uid },
        { $set: data }
      );
      if (!isUpdated) {
        throw new ErrorHandler(400, "Physician Not Rejected");
      }
      mailer({
        subject: "Account Rejected",
        template : 'email',
        context: {
          email: clinicData.email,
          text: `Your Email Has Been Rejected`,
          heading : "Physician Rejected"
        }
       })
      res.json({ msg: "Physician Rejected Successfully !" });
    } catch (error) {
      next(error);
    }
  },

  updatePassword: async function (req, res, next) {
    try {
      const uid = req.decoded.uid;
      const { password } = req.body;

      //checking the validity of request
      const userData = await PhysicianInfoModel.findById(uid).select('resetPassword')
      if(!userData.resetPassword) throw new ErrorHandler(400, "Invalid password Change request");
      
      // hash password
      const hashPassword = await authHelper.hashPassword(password);
      if (!hashPassword) {
        throw new ErrorHandler(500, "Partial Service Outage");
      }

      //constructing object
      const data = {
        password : hashPassword,
        resetPassword : false
      }

      //update query
      const isUpdated = await PhysicianInfoModel.updateOne(
        { _id: uid },
        { $set: data }
      );
      if (!isUpdated) {
        throw new ErrorHandler(400, "Password not updated");
      }
      res.json({ msg: "Password updated Successfully" });
    } catch (error) {
      next(error);
    }
  },



   //test function
   testMail: async function (req, res, next) {
    try {
      const email = req.query.email
      mailer( {
        subject: "credentials",
        template : 'email',
        context: {
          email: email,
          text : `One Time Password : `,
          heading : "Welcome to Medicare xChain"
        }});
      return res.status(200).json({msg:"User Registered Successfully kindly Check Your Mail to get your credentials"});
    } catch (error) {
      next(error);
    }
  },


};

module.exports = ClinicInfos;
