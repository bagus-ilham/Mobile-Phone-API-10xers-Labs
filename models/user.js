"use strict";
const { Model } = require("sequelize");
const { hasPass } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Username is required" },
          notEmpty: { msg: "Username is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: {
          msg: "Email is not a valid email",
        },
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email is required" },
        },
        unique: {
          args: true,
          msg: "Email already registered",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password is required" },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone Number is required" },
          notEmpty: { msg: "Phone Number is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user) => {
    user.password = await hasPass(user.password);
  });
  return User;
};
