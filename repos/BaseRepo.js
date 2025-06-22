module.exports = class BaseRepository {
  model;
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findOne(customQuery = null) {
    return this.model.findOne(customQuery);
  }

  async findAll(customQuery = null) {
    if(!customQuery) {
      customQuery = {};
    }
    return this.model.findAll(customQuery);
  }
  
  async findMany(customQuery = null) {
    if(!customQuery) {
      customQuery = {};
    }
    return this.model.findAll(customQuery);
  }

  async count(customQuery = null) {
    return this.model.count(customQuery);
  }

  async update(data, customQuery = null) {
    return this.model.update(data, customQuery);
  }

  async bulkCreate(data, options = {}) {
    try {
      return await this.model.bulkCreate(data, {
        ...options,
        // Set validate to true to ensure data integrity
        validate: true,
        // Set fields to only allow fields defined in the model
        fields: Object.keys(this.model.rawAttributes)
      });
    } catch (error) {
      console.error(`Error in bulkCreate for ${this.model.name}:`, error);
      throw error;
    }
  }

  async delete(data) {
    return this.model.destroy(data);
  }
};
