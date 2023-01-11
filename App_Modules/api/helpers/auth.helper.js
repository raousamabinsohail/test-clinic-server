const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const allModels = require("../models/index");

const {
  UserInfo,
  AdminInfo,
  ClinicInfo,
  laboratoryInfo,
  PhysicianInfo,
  PatientInfo
} = allModels;

let refreshTokenList = []

exports.refreshTokenList = refreshTokenList;


//User Exist Check
exports.isClinicExist = async (_uid) => {
  try {
    const isExist =  await ClinicInfo.exists({email: _uid})
    return isExist;
	} catch (error) {
    return false;
	}
}

//User Exist Check
exports.isLabExist = async (_uid) => {
  try {
    const isExist =  await laboratoryInfo.exists({email: _uid})
    return isExist;
	} catch (error) {
    return false;
	}
}

//User Exist Check
exports.isPhysicianExist = async (_uid) => {
  try {
    const isExist =  await PhysicianInfo.exists({email: _uid})
    return isExist;
	} catch (error) {
    return false;
	}
}

//User Exist Check
exports.isUserExist = async (_uid) => {
  try {
    const isExist =  await UserInfo.exists({cnic: _uid})
    return isExist;
	} catch (error) {
    return false;
	}
}

//Admin Exist Check
exports.isAdminExist = async (_uid) => {
  try {
    const isExist =  await AdminInfo.exists({cnic: _uid})
    return isExist;
	} catch (error) {
    return false;
	}
}


exports.jwtVerify = async (token) => {
 const userData = await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  return userData;
}

exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const HashPassword = await bcrypt.hash(password, salt);
    return HashPassword;
  } catch (error) {
    return null;
  }
}

exports.createJwtTokens = ( cnic , uid )  => {
  const userData = {
    date: Date.now(),
    uid: uid,
    cnic: cnic
  }
  const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY,});
  const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET);
  refreshTokenList.push(refreshToken);
  return { refreshToken: refreshToken, accessToken: accessToken };
}


exports.validateClinicPassword = async (uid, userPassword) => {
  try {
    const { password } = await ClinicInfo.findOne({email: uid }, "password");
    const  isMatch  = await bcrypt.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    return false;
  }
}

exports.validateLabPassword = async (uid, userPassword) => {
  try {
    const { password } = await laboratoryInfo.findOne({email: uid }, "password");
    const  isMatch  = await bcrypt.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    return false;
  }
}

exports.validatePhysicianPassword = async (uid, userPassword) => {
  try {
    const { password } = await PhysicianInfo.findOne({email: uid }, "password");
    const  isMatch  = await bcrypt.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    return false;
  }
}

exports.validatePatientPassword = async (uid, userPassword) => {
  try {
    const { password } = await PatientInfo.findOne({email: uid }, "password");
    const  isMatch  = await bcrypt.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    return false;
  }
}

exports.validatePassword = async (uid, userPassword) => {
  try {
    const { password } = await UserInfo.findOne({cnic: uid }, "password");
    const  isMatch  = await bcrypt.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    return false;
  }
}

exports.validateAdminPassword = async (cnic, userPassword) => {
  try {
    const { password } = await AdminInfo.findOne({ cnic: cnic }, "password");
    const  isMatch  = await bcrypt.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    return false;
  }
}

exports.generatePassword= async () => {
  try {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$@",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  } catch (error) {
    return false;
  } 
}