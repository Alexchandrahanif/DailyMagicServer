"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require("../helper/helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Username Tidak Boleh Kosong",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email Sudah Terdaftar",
        },
        validate: {
          notEmpty: {
            msg: "Email Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Email Tidak Boleh Kosong",
          },
          isEmail: {
            msg: "Mohon Input Dengan Format Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Password Tidak Boleh Kosong",
          },
        },
      },
      phoneNumber: DataTypes.STRING,
      photoUser: DataTypes.STRING,
      address: DataTypes.STRING,
      lastActive: DataTypes.DATE,
      statusActive: DataTypes.BOOLEAN,
      softDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((data) => {
    data.password = hashingPassword(data.password);
  });
  return User;
};
