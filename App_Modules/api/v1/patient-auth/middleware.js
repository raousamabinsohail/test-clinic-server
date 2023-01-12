const Joi = require("joi");
const { ErrorHandler } = require("../../helpers/errorhandler");

exports.validateRegisterationSchema = (req, res, next) => {
  try {
    const userLogin = Joi.object({
      name: Joi.string().max(255).required(),
      ID: Joi.string(),
      email : Joi.string().required(),
      address: Joi.object(),
      DOB: Joi.string(),
      sex: Joi.string().valid('Male','Female','Other'),
      bloodGroup : Joi.string(),
      // socialMediaInfo : Joi.object(),
      // bankInfo : Joi.object({
      //   accountHolderName : Joi.string().required(),
      //   bankName : Joi.string().required(),
      //   IBAN : Joi.string().required(),
      //   accountNumber: Joi.string().required(),
      //   branchCode: Joi.string(),
      // }),
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

exports.validateUpdatePasswordSchema = (req, res, next) => {
  try {
    const data = Joi.object({
      password : Joi.string().required()
    });
    const { error } = data.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.validateAssignClinicData = (req, res, next) => {
  try {
    const data = Joi.object({
      clinics : Joi.array().items(Joi.string().required()).required()
    });
    const { error } = data.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }
    next();
  } catch (error) {
    next(error);
  }
};