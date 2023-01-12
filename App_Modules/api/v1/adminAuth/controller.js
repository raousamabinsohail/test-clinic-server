const AdminfoModel = require('../../models/admin')
const authHelper = require("../../helpers/auth.helper.js");
const { ErrorHandler } = require("../../helpers/errorhandler");


const adminInfoAuthentication = {
  
  adminRegister: async function (req, res, next) {
    try {
      const { cnic } = req.body;
      const data = req.body;

      // check user exist
      const userExist = await authHelper.isAdminExist(cnic);
      if (userExist) {
        throw new ErrorHandler(400, "Admin Already Exist");
      }

      // hash password
        const hashPassword = await authHelper.hashPassword(data.password);
        if (!hashPassword) {
          throw new ErrorHandler(500, "Partial Service Outage");
        }
        data.password = hashPassword;

       const registerUser = await new AdminfoModel(data);
       registerUser.save();
       return res.status(200).json({msg:"Admin Registered Successfully ... "});
      } catch (error) {
      next(error);
    }
  },

  adminLogin: async function (req, res, next) {
    try {
      const { cnic, password } = req.body;
      
      const userExist = await authHelper.isAdminExist(cnic);
      if (!userExist) {
        throw new ErrorHandler(404, "Admin Doesn't Exist");
      }
      const isPasswordValid = await authHelper.validateAdminPassword(
        cnic,
        password
      );
      if (!isPasswordValid) {
        throw new ErrorHandler(401, "Invalid Password or CNIC");
      }

      const uid = await AdminfoModel.findOne({ cnic: cnic },[
        "name",
        "cnic",
        "phone"
      ]);
      if (!uid) {
        throw new ErrorHandler(404, "Internal Server Error");
      }
      
      const tokens = authHelper.createJwtTokens(cnic, uid._id);
      
    

      const response = {
        ...tokens,
        success: true,
        message: "Login Sucessfully",
        userData: uid,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },


  addBulkUser: async function (req, res, next) {
    try {

      const { data } = req.body

      const exixted = []

      await Promise.all(data.map(async (data)=>{
        
        const { cnic } = data;
        // check user exist
        const userExist = await authHelper.isUserExist(cnic);
        // console.log("user==>",userExist)
        if (userExist) {
          exixted.push(cnic)
        } else {
          //generating random password
          const password = await authHelper.generatePassword()
        
          // hash password
           const hashPassword = await authHelper.hashPassword(password);
           if (!hashPassword) {
             throw new ErrorHandler(500, "Partial Service Outage");
           }
           data.password = hashPassword;
           data.key = password
           
          const registerUser = await new UserInfoModel(data);
           registerUser.save(async (err , doc)=>{
           if(err) throw new ErrorHandler(500, "Partial Service Outage");
           const initial = {
             user:  doc._id,
             ...initalData
           }
           const scoreData = await new ScoresInfo(initial);
           scoreData.save()
           return
         });
        }
  
      }))

     
      
      return res.status(200).json({msg:"User Registered Successfully ... ", alreadyRegisteredCNIC : exixted });
      } catch (error) {
      next(error);
    }
  },

};


module.exports = adminInfoAuthentication;
