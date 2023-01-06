const router = require("express").Router();
const authMiddleware = require("./middleware.js");
const adminInfoAuthentication = require("./controller");


// register Admin
router.post("/register",
  authMiddleware.validateRegisterationSchema,
  adminInfoAuthentication.adminRegister
);

router.post('/login',
  authMiddleware.validateLoginSchema,
  adminInfoAuthentication.adminLogin
);

router.post('/BulkInsert',
  authMiddleware.validateRegisterationSchema,
  adminInfoAuthentication.addBulkUser
);






module.exports = router;
