"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spending extends Model {
    static associate(models) {
      Spending.belongsTo(models.User, {
        foreignKey: "UserId",
      });

      Spending.belongsTo(models.SpendingCategories, {
        foreignKey: "SpendingCategoryId",
      });
    }
  }
  Spending.init(
    {
      total: DataTypes.INTEGER,
      notes: DataTypes.TEXT,
      UserId: DataTypes.UUID,
      SpendingCategoryId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Spending",
    }
  );
  return Spending;
};
