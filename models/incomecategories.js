"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IncomeCategories extends Model {
    static associate(models) {
      IncomeCategories.hasMany(models.Income, {
        foreignKey: "IncomeCategoryId",
      });
    }
  }
  IncomeCategories.init(
    {
      type: DataTypes.STRING,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "IncomeCategories",
    }
  );
  return IncomeCategories;
};
