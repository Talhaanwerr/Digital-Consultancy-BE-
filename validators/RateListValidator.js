const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class RateListValidator extends BaseValidator {
  validateCreateRateList = (data) => {
    const schema = Joi.object().keys({
      title: Joi.string().max(120).required(),
      time: Joi.string().max(80).allow(null, ""),
      category: Joi.string().max(80).required(),
      price: Joi.number().precision(2).required(),
      requirements: Joi.array().items(Joi.string()).required(),
    });

    return this.validate(schema, data);
  };

  validateUpdateRateList = (data) => {
    const schema = Joi.object().keys({
      title: Joi.string().max(120),
      time: Joi.string().max(80).allow(null, ""),
      category: Joi.string().max(80),
      price: Joi.number().precision(2),
      requirements: Joi.array().items(Joi.string()),
    });

    return this.validate(schema, data);
  };
}

module.exports = new RateListValidator(); 