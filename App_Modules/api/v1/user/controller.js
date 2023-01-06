const UserInfoModel = require("../../models/user");
const { ErrorHandler } = require("../../helpers/errorhandler");
const authHelper = require("../../helpers/auth.helper.js");
const mongoose = require("mongoose");

const UserInfos = {
 
  getAllUser: async function (req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const offset = Number(req.query.offset) || 10;
      const key = req.query.key;
      let value = req.query.value;
      const skip = page * offset - offset;
      const query = {};

      if (key && value) {
        if (key === "isActive"){
          value = value == 'true' ? true : false
          }
        query[key] = value;
      }

      const totalUsers = await UserInfoModel.countDocuments(query);
      const users = await UserInfoModel.find(query)
        .limit(offset)
        .skip(skip)
        .sort({ createdDate: -1 });

      res.json({
        msg: "User fetched Successfully",
        data: users,
        total: totalUsers,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllFilteredUser: async function (req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const offset = Number(req.query.offset) || 10;
      const skip = page * offset - offset;
      const query = req.body;

      // query['isActive'] = true;

      if(query.name){
        
        
        reje1 = `^${query.name}`  //  /^rao/i
        reje2 = `^${query.name}` // /^rao/
        
        reje1 = new RegExp(reje1 ,"i")  //  /^rao/i
        reje2 = new RegExp(reje2)  // /^rao/


        query['name'] = { $in: [ reje1 , reje2 ] }
      }
      const totalUsers = await UserInfoModel.countDocuments({isActive : true});
      const totalFilteredUsers = await UserInfoModel.countDocuments(query);
      const users = await UserInfoModel.find(query)
        .select("_id cnic name phone city warehouse key createdDate")
        .limit(offset)
        .skip(skip)
        .sort({ createdDate: -1 });

      res.json({
        msg: "User fetched Successfully",
        data : users,
        total: totalUsers,
        totalFilteredUsers: totalFilteredUsers
      
      });
    } catch (error) {
      next(error);
    }
  },

 
  getSpecificUserData: async function (req, res, next) {
    try {
      const uid = req.params;
      const userData = await UserInfoModel.findById(
        mongoose.Types.ObjectId(uid.id)
      ).select("_id cnic name phone city warehouse createdDate");
      if (!userData) {
        throw new ErrorHandler(404, "User doesn't found");
      }
      res.json({
        data: userData,
        msg: "User found",
      });
    } catch (error) {
      next(error);
    }
  },

  getRequestedUserData: async function (req, res, next) {
    try {
      const { uid } = req.decoded;
      const userData = await UserInfoModel.findById(
        mongoose.Types.ObjectId(uid)
      );
      if (!userData) {
        throw new ErrorHandler(404, "User doesn't found");
      }
      res.json({
        data: userData,
        msg: "User found",
      });
    } catch (error) {
      next(error);
    }
  },

  updateProfile: async function (req, res, next) {
    try {
      const { _id } = req.body;
      const data = req.body;
      delete data._id

      const isUpdated = await UserInfoModel.updateOne(
        { _id: _id },
        { $set: data }
      );
      if (!isUpdated) {
        throw new ErrorHandler(400, "User Not Updated");
      }
      res.json({ msg: "Updated Successfully" });
    } catch (error) {
      next(error);
    }
  },


  deleteUser: async function (req, res, next) {
    try {
      const uid = req.params.id;
      const isUpdated = await UserInfoModel.deleteOne(
        { _id: uid },
      );
      if (!isUpdated) {
        throw new ErrorHandler(400, "User Not Deleted");
      }
      res.json({ msg: "User Deleted Successfully!" });
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async function (req, res, next) {
    try {
      const { _id , password } = req.body;
      const userExists = await UserInfoModel.exists({ _id : _id})
      if(!userExists) throw new ErrorHandler(404, "User not Exists..");
      
      // hash password
      const hashPassword = await authHelper.hashPassword(password);
      if (!hashPassword) {
        throw new ErrorHandler(500, "Partial Service Outage");
      }

      //constructing object
      const data = {
        password : hashPassword,
        key : password
      }

      //update query
      const isUpdated = await UserInfoModel.updateOne(
        { _id: _id },
        { $set: data }
      );
      console.log("isUpdated.modifiedCount>",isUpdated.modifiedCount)
      if (isUpdated.modifiedCount == 0) {
        throw new ErrorHandler(400, "Password not updated");
      }
      res.json({ msg: "Password updated Successfully" });
    } catch (error) {
      next(error);
    }
  },



};

module.exports = UserInfos;
