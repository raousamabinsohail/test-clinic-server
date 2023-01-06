const UserInfoModel = require("../../models/user");
const authHelper = require("../../helpers/auth.helper.js");
const { ErrorHandler } = require("../../helpers/errorhandler");


const userInfoAuthentication = {
  userLogin: async function (req, res, next) {
    try {
      const { cnic, password } = req.body;
      
      const userExist = await authHelper.isUserExist(cnic);
      if (!userExist) {
        throw new ErrorHandler(404, "User Doesn't Exist");
      }
      const isPasswordValid = await authHelper.validatePassword(
        cnic,
        password
      );
      if (!isPasswordValid) {
        throw new ErrorHandler(401, "Invalid Password or CNIC");
      }

      const uid = await UserInfoModel.findOne({ cnic: cnic },[
        "name",
        "cnic",
        "phone",
        "city",
        "warehouse"
      ]);
      if (!uid) {
        throw new ErrorHandler(404, "Internal Server Error");
      }
    
      const tokens = await authHelper.createJwtTokens(cnic, uid._id);
      
      const data = await ScoresInfo.findOne({user : uid._id}).sort({$natural:-1})


      const response = {
        ...tokens,
        success: true,
        message: "Login Sucessfully",
        userData: uid,
        stage:data 
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  userRegister: async function (req, res, next) {
    try {
      const { cnic } = req.body;
      const data = req.body;

      // check user exist
      const userExist = await authHelper.isUserExist(cnic);
      if (userExist) {
        throw new ErrorHandler(400, "User Already Exist");
      }

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
      });
      
      return res.status(200).json({msg:"User Registered Successfully ... "});
      } catch (error) {
      next(error);
    }
  },



};

module.exports = userInfoAuthentication;
