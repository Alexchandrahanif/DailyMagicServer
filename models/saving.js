"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Saving extends Model {
    static associate(models) {
      Saving.belongsTo(models.User, {
        foreignKey: "UserId",
      });

      Saving.belongsTo(models.SavingCategories, {
        foreignKey: "SavingCategoryId",
      });
    }
  }
  Saving.init(
    {
      total: DataTypes.INTEGER,
      purpose: DataTypes.STRING,
      notes: DataTypes.TEXT,
      SavingCategoryId: DataTypes.UUID,
      UserId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Saving",
    }
  );
  return Saving;
};
