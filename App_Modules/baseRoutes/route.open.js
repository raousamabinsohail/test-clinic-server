const express = require("express");
const app = express();
const router = express.Router();



router.use("/api/v1/a/auth", require("../api/v1/adminAuth/route.js"));

//Clinic auth 
router.use("/api/v1/c/auth", require("../api/v1/clinic/route.js"));

//Lab auth 
router.use("/api/v1/lab/auth", require("../api/v1/laboratory-auth/route.js"));

//Clinic auth 
router.use("/api/v1/phy/auth", require("../api/v1/physician-auth/route.js"));

//Lab auth 
router.use("/api/v1/lab/auth", require("../api/v1/laboratory-auth/route.js"));

//Patient auth 
router.use("/api/v1/pat/auth", require("../api/v1/patient-auth/route.js"));


//files
router.use("/api/v1/files", require("../api/v1/files/route.js"));

module.exports = router;