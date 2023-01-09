const mongoose = require("mongoose");

const mailLogSchema = new mongoose.Schema(
  {
    meta: {
      type: Object,
    },
    status: {
      type : String,
      enum : ["ERROR","SUCCESS"]
    },
    timeStemp: {
        type: String,
        default: Date.now()
    },
  },
  { strict: false }
);

const MailLogSchema = mongoose.model("mail_logs", mailLogSchema, "mail_logs");
module.exports = MailLogSchema;
