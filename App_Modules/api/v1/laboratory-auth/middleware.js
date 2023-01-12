const Joi = require("joi");
const { ErrorHandler } = require("../../helpers/errorhandler");

exports.validateRegisterationSchema = (req, res, next) => {
  try {
    const userLogin = Joi.object({
      labName: Joi.string().max(255).required(),
      email : Joi.string().required(),
      address: Joi.string().min(3).max(255).required(),
      operationHours: Joi.string(),
      numberOfLabTechnican : Joi.number().required(),
      clinics : Joi.array().items(Joi.string().required()),
      socialMediaInfo : Joi.object({
        webUrl : Joi.string()
      }),
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