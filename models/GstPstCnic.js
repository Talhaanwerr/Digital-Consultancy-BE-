'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GstPstCnic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      GstPstCnic.belongsTo(models.GstPstRegistration, { 
        foreignKey: 'gstPstRegistrationId', 
        as: 'gstPstRegistration' 
      });
      GstPstCnic.belongsTo(models.User, { 
        foreignKey: 'userId', 
        as: 'user' 
      });
    }
  }
  
  GstPstCnic.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gstPstRegistrationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cnicImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'GstPstCnic',
  });
  
  return GstPstCnic;
}; 