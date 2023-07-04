const Controller = require("../controller/incomeCategory");

const incomeCategoriesRouter = require("express").Router();

incomeCategoriesRouter.get("/", Controller);

module.exports = incomeCategoriesRouter;
