const router = require("express").Router();
const laboratoryMiddleware = require("./middleware.js");
const laboratoryInfo = require("./controller");


/**
 * Clinic Registration route
 */
router.post("/register",
  laboratoryMiddleware.validateRegisterationSchema,
  laboratoryInfo.registerLab
);

/**
 * Clinic Registration route
 */
router.post("/get",
  laboratoryInfo.getAllClinics
);

/**
 * Clinic Login route
 */
router.post("/login",
  laboratoryMiddleware.validateLoginSchema,
  laboratoryInfo.clinicLogin
);

/**
 * Approve Clicic
 */
router.put('/approve/:id',
laboratoryInfo.activateClinic
);

//update password on first login
router.put("/update-password",
laboratoryMiddleware.validateUpdatePasswordSchema,
laboratoryInfo.updatePassword
);

/**
 * Approve Reject
 */
router.put('/reject/:id',
laboratoryInfo.rejectClinic
);


/**
 * Assign Clinics
 */
router.put('/assign-clinic/:id',
laboratoryMiddleware.validateAssignClinicData,
laboratoryInfo.assignClinic
);


module.exports = router;
