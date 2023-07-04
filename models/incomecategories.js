"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IncomeCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
