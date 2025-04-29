const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class UserValidator extends BaseValidator {
  validateRegisterUser = (user) => {
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().min(11).max(14).required(),
      email: Joi.string().email().required(),
      cnic: Joi.string().required().min(13).max(13),
      password: Joi.string().min(6).required(),
    });

    return this.validate(schema, user);
  };

  validateLoginUser = (user) => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    return this.validate(schema, user);
  };

  validateUpdateUser = (user) => {
    const schema = Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      phone: Joi.string().min(11).max(14),
      email: Joi.string().email(),
      status: Joi.string().valid("active", "inactive", "suspended"),
      roleId: Joi.number().integer(),
      username: Joi.string().min(3),
      imageUrl: Joi.string().allow(null, ""),
      address: Joi.string().allow(null, ""),
      cnic: Joi.string().allow(null, ""),
      dob: Joi.date().allow(null),
      gender: Joi.string().allow(null, ""),
      emailVerified: Joi.boolean(),
    });

    return this.validate(schema, user);
  };
}

module.exports = new UserValidator();
