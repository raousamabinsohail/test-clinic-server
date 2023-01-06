const router = require("express").Router();
const dataMiddleware = require("./middleware.js");
const filesRoute = require("./controller");

router.post("/",
  filesRoute.addFile
)

module.exports = router;
