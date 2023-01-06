const Joi = require("joi");
const { ErrorHandler } = require("../../helpers/errorhandler");

exports.validateRegisterationSchema = (req, res, next) => {
  try {
    const userRegister = Joi.object({
      name: Joi.string().min(3).max(255).required(),
      cnic: Joi.string().min(13).max(13).required(),
      phone: Joi.string().required(),
      city: Joi.string().required(),
      warehouse: Joi.string().required(),
    });
    const { error } = userRegister.validate(req.body);
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
      cnic: Joi.string().min(3).max(255).required(),
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

