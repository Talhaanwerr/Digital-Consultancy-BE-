const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class TaxDeductionCategoryRepo extends BaseRepository {
  constructor() {
    super(db.TaxDeductionCategory);
    this.model = db.TaxDeductionCategory;
    this.bridgeModel = db.IndividualTaxReturn_TaxDeductionCategory;
  }

  async findAllCategories() {
    return this.findAll({
      order: [["name", "ASC"]],
      attributes: ["id", "name"]
    });
  }

  async findCategoryById(id) {
    return this.findOne({
      where: { id }
    });
  }

  async findCategoriesByTaxReturnId(individualTaxReturnId) {
    return this.model.findAll({
      include: [
        {
          model: db.IndividualTaxReturn,
          as: 'taxReturns',
          where: { id: individualTaxReturnId },
          attributes: [],
          through: { attributes: [] }
        }
      ]
    });
  }

  async saveCategoriesForTaxReturn(individualTaxReturnId, categoryIds, transaction = null) {
    // First delete existing associations
    await this.bridgeModel.destroy({
      where: { individualTaxReturnId },
      transaction
    });

    // Create new associations
    const bridgeEntries = categoryIds.map(categoryId => ({
      individualTaxReturnId,
      categoryId,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return this.bridgeModel.bulkCreate(bridgeEntries, { transaction });
  }
}

module.exports = new TaxDeductionCategoryRepo(); 