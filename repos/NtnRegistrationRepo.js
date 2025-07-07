const BaseRepository = require("./BaseRepo");
const { NtnRegistration, User } = require("../models");
const { Op } = require("sequelize");

class NtnRegistrationRepo extends BaseRepository {
  constructor() {
    super(NtnRegistration);
  }

  async findByUserIdAndTelecom(userId, telecom, email) {
    return this.findOne({
      where: { 
        userId,
        telecom,
        email
      }
    });
  }

  async findByUserId(userId, filters = {}) {
    const whereClause = { userId };

    // Apply filters if provided
    if (filters.applicationStatus) {
      whereClause.applicationStatus = filters.applicationStatus;
    }

    if (filters.telecom) {
      whereClause.telecom = filters.telecom;
    }

    if (filters.invoiceStatus) {
      whereClause.invoiceStatus = filters.invoiceStatus;
    }

    return this.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async findByIdWithUser(id, userId = null) {
    const whereClause = { id };
    if (userId) {
      whereClause.userId = userId;
    }

    return this.findOne({
      where: whereClause,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
  }

  async findAllNtnRegistrations(options = {}) {
    return this.findAll({
      ...options,
      order: options.order || [["createdAt", "DESC"]]
    });
  }
}

module.exports = new NtnRegistrationRepo(); 