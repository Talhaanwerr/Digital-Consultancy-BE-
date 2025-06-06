const BaseValidator = require("./BaseValidator.js");

class WealthStatementValidator extends BaseValidator {
  constructor() {
    super();
  }
  
  validateWealthStatementData(data) {
    // Check if taxYear is provided
    if (!data.taxYear) {
      return this.error("Tax year is required");
    }
    
    // Validate that at least one section is provided
    if (!data.opening && !data.assets && !data.liabilities && !data.expense) {
      return this.error("At least one section (opening, assets, liabilities, or expense) must be provided");
    }
    
    // Return success with validated data
    return this.success({
      taxYear: data.taxYear,
      opening: data.opening || null,
      assets: data.assets || null,
      liabilities: data.liabilities || null,
      expense: data.expense || null,
    });
  }
}

module.exports = new WealthStatementValidator(); 