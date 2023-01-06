const router = require("express").Router();
const userMiddleware = require("./middleware.js");
const UserInfos = require("./controller");

// get all users
router.get("/",
  UserInfos.getAllUser
);

// get all filtered users
router.post("/filter",
userMiddleware.validateFilterUserSchema,
  UserInfos.getAllFilteredUser
);

// get specifiv user by id
router.get('/id/:id',
  UserInfos.getSpecificUserData
);

//update the user profile 
router.put('/',
  userMiddleware.validateUserSchema,
  UserInfos.updateProfile
);

//delete User by id
router.delete('/id/:id',
 UserInfos.deleteUser
);


//update password
router.put("/reset-password",
  userMiddleware.validateResetPasswordSchema,
  UserInfos.resetPassword
);

module.exports = router;
