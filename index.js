// Import express
const express = require("express");
// Import Body parser
const bodyParser = require("body-parser");
// Import Mongoose
const mongoose = require("mongoose");
const app = express();
const server = require("http").createServer(app);
// Initialise bcrypt for encrption
let bcrypt = require("bcryptjs");
//importing environment variables
const dotenv = require("dotenv");
dotenv.config();

//importing file upload package
const fileUpload = require("express-fileupload");

var cors = require("cors");

//importing authorization controller
const closeRouteController = require("./App_Modules/baseRoutes/controller.js");
//importing routes that do not needs authorization (Open routes)
const openRoutes = require("./App_Modules/baseRoutes/route.open");
//importing routes that needs authorization (close routes)
const closeRoutes = require("./App_Modules/baseRoutes/route.close.js");

//Mounding error handler
const { handleError } = require("./App_Modules/api/helpers/errorhandler");
const { verifyUser } = closeRouteController;

//Connecting DB
try {
    mongoose.connect(process.env.DB_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // mongoose.set("useFindAndModify", false);
    mongoose.connection.on("connected", () => {
      console.log("Connected To Data Base ...");
    });
  } catch (error) {
    console.log("could not connect");
  }

//middleware
app.use(cors());
app.use(express.json());
app.use(function (error, req, res, next) {
  console.log("error");
  res.sendStatus(400);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Files middleware
app.use(fileUpload());
app.use("/public", express.static("public"));

// Routes
app.use(openRoutes);
app.use(verifyUser, closeRoutes);
app.use((err, req, res, next) => {
  handleError(err, res, next);
});

PORT = process.env.PORT || 4003;
server.listen(PORT, () =>
  console.log("Running Clinic App On Port: " + PORT + "...")
);
