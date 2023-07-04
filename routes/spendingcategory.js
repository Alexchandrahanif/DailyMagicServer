const Controller = require("../controller/spendingCategory");

const spendingCategoriesRouter = require("express").Router();

spendingCategoriesRouter.get("/", Controller);

module.exports = spendingCategoriesRouter;
