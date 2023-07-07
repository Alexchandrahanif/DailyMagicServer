const Controller = require("../controller/spendingCategory");

const spendingCategoriesRouter = require("express").Router();

spendingCategoriesRouter.get("/", Controller.getAllSpendingCategory);

spendingCategoriesRouter.get("/:id", Controller.getOneSpendingCategory);

spendingCategoriesRouter.post("/", Controller.createSpendingCategory);

spendingCategoriesRouter.patch("/:id", Controller.updateSpendingCategory);

spendingCategoriesRouter.delete("/:id", Controller.deleteSpendingCategory);

module.exports = spendingCategoriesRouter;
