"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SavingCategories extends Model {
    static associate(models) {
      SavingCategories.hasMany(models.Saving, {
        foreignKey: "SavingCategoryId",
      });
    }
  }
  SavingCategories.init(
    {
      type: DataTypes.STRING,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "SavingCategories",
    }
  );
  return SavingCategories;
};
