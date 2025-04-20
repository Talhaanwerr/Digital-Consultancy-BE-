"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING(255),
      lastName: DataTypes.STRING(255),
      username: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: 'inactive',
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      otp: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      otpExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      cnic: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      rememberToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
