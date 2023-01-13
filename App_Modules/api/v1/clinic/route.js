const router = require("express").Router();
const clinicMiddlewar = require("./middleware.js");
const clinicInfos = require("./controller");


/**
 * Clinic Full Clinic Data
 */
router.get("/:id",
  clinicInfos.getAllClinics
);

module.exports = router;
