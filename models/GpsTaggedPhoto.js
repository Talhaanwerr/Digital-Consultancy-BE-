'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GpsTaggedPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      GpsTaggedPhoto.belongsTo(models.GstPstRegistration, { 
        foreignKey: 'gstPstRegistrationId', 
        as: 'gstPstRegistration' 
      });
      GpsTaggedPhoto.belongsTo(models.User, { 
        foreignKey: 'userId', 
        as: 'user' 
      });
    }
  }
  
  GpsTaggedPhoto.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gstPstRegistrationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'GpsTaggedPhoto',
  });
  
  return GpsTaggedPhoto;
}; 