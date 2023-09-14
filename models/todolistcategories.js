"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TodoListCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TodoListCategories.hasMany(models.TodoList, {
        foreignKey: "TodoListCategoryId",
      });
    }
  }
  TodoListCategories.init(
    {
      type: DataTypes.STRING,
      note: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "TodoListCategories",
    }
  );
  return TodoListCategories;
};
