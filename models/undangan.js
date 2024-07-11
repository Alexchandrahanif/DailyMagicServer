'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Undangan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Undangan.init({
    nama: DataTypes.STRING,
    pasangan: DataTypes.STRING,
    prioritas: DataTypes.STRING,
    keterangan: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Undangan',
  });
  return Undangan;
};