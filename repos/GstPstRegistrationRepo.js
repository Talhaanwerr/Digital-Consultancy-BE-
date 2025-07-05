const BaseRepository = require("./BaseRepo");
const {
  GstPstRegistration,
  GpsTaggedPhoto,
  GstPstCnic,
  User,
} = require("../models");
const { Op } = require("sequelize");

class GstPstRegistrationRepo extends BaseRepository {
  constructor() {
    super(GstPstRegistration);
  }

  async findByIdWithRelations(id, userId = null) {
    const whereClause = { id };
    if (userId) {
      whereClause.userId = userId;
    }

    return this.findOne({
      where: whereClause,
      include: [
        { model: GpsTaggedPhoto, as: "gpsTaggedPhotos" },
        { model: GstPstCnic, as: "gstPstCnics" },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
  }

  async findByUserId(userId, filters = {}) {
    const whereClause = { userId };

    // Apply filters if provided
    if (filters.applicationStatus) {
      whereClause.applicationStatus = filters.applicationStatus;
    }

    if (filters.invoiceStatus) {
      whereClause.invoiceStatus = filters.invoiceStatus;
    }

    if (filters.businessName) {
      whereClause.businessName = {
        [Op.like]: `%${filters.businessName}%`,
      };
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

  async createWithRelations(data, gpsTaggedPhotos = [], gstPstCnics = []) {
    // Create the main registration record
    const registration = await this.create(data);

    // Handle GPS tagged photos if provided
    if (gpsTaggedPhotos && gpsTaggedPhotos.length > 0) {
      const photosWithRelation = gpsTaggedPhotos.map((photo) => ({
        ...photo,
        gstPstRegistrationId: registration.id,
        userId: data.userId,
      }));

      await GpsTaggedPhoto.bulkCreate(photosWithRelation);
    }

    // Handle CNIC images if provided
    if (gstPstCnics && gstPstCnics.length > 0) {
      const cnicsWithRelation = gstPstCnics.map((cnic) => ({
        ...cnic,
        gstPstRegistrationId: registration.id,
        userId: data.userId,
      }));

      await GstPstCnic.bulkCreate(cnicsWithRelation);
    }

    // Return the complete record with relations
    return this.findByIdWithRelations(registration.id);
  }

  async findAllGSTPST(options = {}) {
    return this.findAll(options);
  }

  async updateWithRelations(
    id,
    data,
    gpsTaggedPhotos = null,
    gstPstCnics = null
  ) {
    // Update the main registration record
    await this.update(data, { where: { id } });

    // Handle GPS tagged photos if provided
    if (gpsTaggedPhotos !== null) {
      // Delete existing photos
      await GpsTaggedPhoto.destroy({ where: { gstPstRegistrationId: id } });

      // Create new photos if any
      if (gpsTaggedPhotos && gpsTaggedPhotos.length > 0) {
        const photosWithRelation = gpsTaggedPhotos.map((photo) => ({
          ...photo,
          gstPstRegistrationId: id,
          userId: data.userId,
        }));

        await GpsTaggedPhoto.bulkCreate(photosWithRelation);
      }
    }

    // Handle CNIC images if provided
    if (gstPstCnics !== null) {
      // Delete existing CNICs
      await GstPstCnic.destroy({ where: { gstPstRegistrationId: id } });

      // Create new CNICs if any
      if (gstPstCnics && gstPstCnics.length > 0) {
        const cnicsWithRelation = gstPstCnics.map((cnic) => ({
          ...cnic,
          gstPstRegistrationId: id,
          userId: data.userId,
        }));

        await GstPstCnic.bulkCreate(cnicsWithRelation);
      }
    }

    // Return the complete record with relations
    return this.findByIdWithRelations(id);
  }
}

module.exports = new GstPstRegistrationRepo();
