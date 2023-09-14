"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      TodoList.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      TodoList.belongsTo(models.TodoListCategories, {
        foreignKey: "TodoListCategoryId",
      });
    }
  }
  TodoList.init(
    {
      task: DataTypes.STRING,
      deadline: DataTypes.DATE,
      status: DataTypes.STRING,
      priority: DataTypes.STRING,
      note: DataTypes.TEXT,
      TodoListCategoryId: DataTypes.UUID,
      UserId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "TodoList",
    }
  );
  return TodoList;
};
