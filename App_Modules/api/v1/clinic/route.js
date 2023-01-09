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
 * Clinic Registration route
 */
router.get("/",
  clinicInfos.getAllClinics
);

/**
 * Clinic Login route
 */
router.post("/login",
  clinicMiddlewar.validateLoginSchema,
  clinicInfos.clinicLogin
);

/**
 * Approve Clicic
 */
router.put('/approve/:id',
clinicInfos.activateClinic
);

/**
 * Approve Reject
 */
router.put('/reject/:id',
clinicInfos.rejectClinic
);


router.get('/mail',
clinicInfos.testMail
);

module.exports = router;
