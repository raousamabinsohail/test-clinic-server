const router = require("express").Router();
const clinicMiddlewar = require("./middleware.js");
const clinicInfos = require("./controller");


/**
 * Clinic Registration route
 */
router.post("/register",
  clinicMiddlewar.validateRegisterationSchema,
  clinicInfos.registerClinic
);

/**
 * Clinic Login route
 */
router.post("/login",
  clinicMiddlewar.validateLoginSchema,
  clinicInfos.clinicLogin
);


module.exports = router;
