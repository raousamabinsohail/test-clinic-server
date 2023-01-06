const router = require("express").Router();
const authMiddleware = require("./middleware.js");
const userInfoAuthentication = require("./controller");




router.post("/register",
  authMiddleware.validateRegisterationSchema,
  userInfoAuthentication.userRegister
);

router.post('/login',
  authMiddleware.validateLoginSchema,
  userInfoAuthentication.userLogin
);



module.exports = router;
