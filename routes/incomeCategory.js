const Controller = require("../controller/incomeCategory");

const incomeCategoriesRouter = require("express").Router();

incomeCategoriesRouter.get("/", Controller.getAllIncomeCategory);

incomeCategoriesRouter.get("/:id", Controller.getOneIncomeCategory);

incomeCategoriesRouter.post("/", Controller.createIncomeCategory);

incomeCategoriesRouter.patch("/:id", Controller.updateIncomeCategory);

incomeCategoriesRouter.delete("/:id", Controller.deleteIncomeCategory);

module.exports = incomeCategoriesRouter;
