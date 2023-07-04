"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Saving extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Saving.init(
    {
      total: DataTypes.INTEGER,
      purpose: DataTypes.STRING,
      notes: DataTypes.STRING,
      UserId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Saving",
    }
  );
  return Saving;
};
