const Joi = require("joi");
const { ErrorHandler } = require("../../helpers/errorhandler");

exports.validateRegisterationSchema = (req, res, next) => {
  try {
    const userLogin = Joi.object({
      clinicName: Joi.string().max(255).required(),
      email : Joi.string().required(),
      password : Joi.string().required(),
      operationDate : Joi.string().required(),
      address: Joi.string().min(3).max(255).required(),
      operationHours: Joi.string(),
      numberOfDoctors : Joi.number().required(),
      socialMediaInfo : Joi.object({
        webUrl : Joi.string()
      }),
      bankInfo : Joi.object({
        accountHolderName : Joi.string().required(),
        bankName : Joi.string().required(),
        IBAN : Joi.string().required(),
        accountNumber: Joi.string().required(),
        branchCode: Joi.string(),
      }).required(),
      file : Joi.object()
    });
    const { error } = userLogin.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.validateLoginSchema = (req, res, next) => {
  try {
    const userLogin = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = userLogin.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }
    next();
  } catch (error) {
    next(error);
  }
};