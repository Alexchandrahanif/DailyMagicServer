"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    static associate(models) {
      Income.belongsTo(models.User, {
        foreignKey: "UserId",
      });

      Income.belongsTo(models.IncomeCategories, {
        foreignKey: "IncomeCategoryId",
      });
    }
  }
  Income.init(
    {
      total: DataTypes.INTEGER,
      notes: DataTypes.TEXT,
      UserId: DataTypes.UUID,
      IncomeCategoryId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Income",
    }
  );
  return Income;
};
