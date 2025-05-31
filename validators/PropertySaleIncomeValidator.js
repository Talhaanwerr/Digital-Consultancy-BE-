const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class PropertySaleIncomeValidator extends BaseValidator {
  validatePropertySaleIncome = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      propertyType: Joi.string().valid('Open Plot', 'Constructed plot', 'Flat').required(),
      purchaseDate: Joi.date().required(),
      saleDate: Joi.date().greater(Joi.ref('purchaseDate')).required(),
      purchasePricePKR: Joi.number().positive().required(),
      salePricePKR: Joi.number().positive().required(),
      propertyAddress: Joi.string().required(),
      advanceTaxChallanUrl: Joi.string().uri().allow(null, '')
    });

    return this.validate(schema, data);
  };
}

module.exports = new PropertySaleIncomeValidator(); 