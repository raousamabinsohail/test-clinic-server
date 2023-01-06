// const ERROR = require("../api/helpers/errorHandler");
const authHelper = require("../api/helpers/auth.helper.js");
const { ErrorHandler } = require("../api/helpers/errorhandler");
const { jwtVerify } = authHelper;

const closeRoutesController = {
  verifyUser: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        throw new ErrorHandler(401, "Unauthorized To Access");
      }

      const decodedData = await jwtVerify(token);
      req.decoded = decodedData;
      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = closeRoutesController;
