const BaseRepo = require("./BaseRepo.js");
const db = require("../models/index.js");

class FaqRepo extends BaseRepo {
  constructor() {
    super(db.Faq);
  }

  async findAllFaqs(options = {}) {
    return await this.model.findAll(options);
  }

  async findFaqById(id, options = {}) {
    return await this.model.findByPk(id, options);
  }

  async createFaq(data, options = {}) {
    return await this.model.create(data, options);
  }

  async updateFaq(id, data) {
    return this.update(data, {
      where: { id },
    });
  }

  async deleteFaq(id, options = {}) {
    return await this.model.destroy({
      where: { id },
      ...options,
    });
  }

  async findAndCountAll(options = {}) {
    return await this.model.findAndCountAll(options);
  }
}

module.exports = new FaqRepo();
