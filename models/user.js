"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require("../helper/helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Income, {
        foreignKey: "UserId",
      });

      User.hasMany(models.Spending, {
        foreignKey: "UserId",
      });

      User.hasMany(models.TodoList, {
        foreignKey: "UserId",
      });
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
      totalBalance: DataTypes.INTEGER,
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
