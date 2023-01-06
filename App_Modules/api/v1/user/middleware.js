const Joi = require("joi");
const { ErrorHandler } = require("../../helpers/errorhandler");

exports.validateUserSchema = (req, res, next) => {
  try {
    const userLogin = Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().min(3).max(255),
      phone: Joi.string(),
      city: Joi.string(),
      warehouse: Joi.string(),
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

exports.validateFilterUserSchema = (req, res, next) => {
  try {
    const userLogin = Joi.object({
      _id: Joi.string(),
      name: Joi.string(),
      cnic: Joi.string(),
      phone: Joi.string(),
      city: Joi.string(),
      warehouse: Joi.string(),
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


exports.validateResetPasswordSchema = (req, res, next) => {
  try {
    const data = Joi.object({
      _id: Joi.string().required(),
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
