const router = require("express").Router();
const physicianMiddleware = require("./middleware.js");
const physicianInfo = require("./controller");


/**
 * Clinic Registration route
 */
router.post("/register",
  physicianMiddleware.validateRegisterationSchema,
  physicianInfo.registerLab
);

/**
 * Clinic Registration route
 */
router.get("/",
  physicianInfo.getAllClinics
);

/**
 * Clinic Login route
 */
router.post("/login",
  physicianMiddleware.validateLoginSchema,
  physicianInfo.clinicLogin
);

/**
 * Approve Clicic
 */
router.put('/approve/:id',
physicianInfo.activateClinic
);

//update password on first login
router.put("/update-password",
physicianMiddleware.validateUpdatePasswordSchema,
physicianInfo.updatePassword
);

/**
 * Approve Reject
 */
router.put('/reject/:id',
physicianInfo.rejectClinic
);

/**
 * Assign Clinics
 */
router.put('/assign-clinic/:id',
physicianMiddleware.validateAssignClinicData,
physicianInfo.assignClinic
);


module.exports = router;
