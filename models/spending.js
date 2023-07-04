"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spending extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Spending.init(
    {
      total: DataTypes.INTEGER,
      notes: DataTypes.TEXT,
      UserId: DataTypes.UUID,
      IncomeCategoryId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Spending",
    }
  );
  return Spending;
};
