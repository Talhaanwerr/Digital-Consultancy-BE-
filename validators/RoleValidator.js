const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class RoleValidator extends BaseValidator {
  validateCreateRole = (role) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().allow(null, ''),
    });

    return this.validate(schema, role);
  };

  validateUpdateRole = (role) => {
    const schema = Joi.object().keys({
      name: Joi.string(),
      description: Joi.string().allow(null, ''),
    });

    return this.validate(schema, role);
  };
}

module.exports = new RoleValidator(); 