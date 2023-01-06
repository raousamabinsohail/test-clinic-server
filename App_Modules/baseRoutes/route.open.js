const express = require("express");
const app = express();
const router = express.Router();

// open routes 
router.use("/api/v1/u/auth", require("../api/v1/userAuthentication/route.js"));

router.use("/api/v1/a/auth", require("../api/v1/adminAuth/route.js"));

router.use("/api/v1/c/auth", require("../api/v1/clinic/route.js"));

//files
router.use("/api/v1/files", require("../api/v1/files/route.js"));

module.exports = router;