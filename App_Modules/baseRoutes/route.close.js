const express = require("express");
const app = express();
const router = express.Router();

//score routes
router.use("/api/v1/u", require("../api/v1/user/route.js"));



module.exports = router;
