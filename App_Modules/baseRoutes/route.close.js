const express = require("express");
const app = express();
const router = express.Router();


//clinic
router.use("/api/v1/c", require("../api/v1/clinic/route.js"));


module.exports = router;
