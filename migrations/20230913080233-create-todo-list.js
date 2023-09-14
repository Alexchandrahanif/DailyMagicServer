"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("TodoLists", {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      task: {
        type: Sequelize.STRING,
      },
      deadline: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
      priority: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.TEXT,
      },
      TodoListCategoryId: {
        type: Sequelize.UUID,
        references: {
          model: "TodoListCategories",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TodoLists");
  },
};
