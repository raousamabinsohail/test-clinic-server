const { ErrorHandler } = require("../../helpers/errorhandler");
const path = require("path");
const util = require("util");

const File = {
  //Add Data Handler
  addFile: async function (req, res, next) {
    try {
      
      const file = req.files.file;
      const fileName = file.name;
      const { type } = req.body;

      const size = file.data.length;
      const extension = path.extname(fileName);
      const md5 = file.md5;
      let maxSize, dir, allowedExtensions;

      switch (type) {
        case "CLINIC":
          allowedExtensions = /png|jpeg|jpg|gif|pdf/;
          if (!allowedExtensions.test(extension))
            throw new ErrorHandler(422,"Unsupported Extension !");
          maxSize = 500000000;
          dir = "clinic-documents";
          break;
        default:
          throw new ErrorHandler(
            400,
            "Type required or invalid type. valid:(CLINIC)! "
          );
        }
      //validating the size
      if (size > maxSize)
        throw new ErrorHandler(
          500,
          `file must be less than ${maxSize / 1000000}MB`
        );
      //constrcting URL
      const URL = `/${dir}/` + md5 + extension;
      //Upload
      await util.promisify(file.mv)("./public" + URL);
      res.json({
        msg: "file uploaded succssfully",
        URL: "/public" + URL,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = File;
