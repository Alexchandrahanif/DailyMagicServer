const Controller = require("../controller/incomeCategory");
const authentication = require("../middleware/authentication");

const incomeCategoriesRouter = require("express").Router();

incomeCategoriesRouter.get(
  "/",
  authentication,
  Controller.getAllIncomeCategory
);

incomeCategoriesRouter.get(
  "/:id",
  authentication,
  Controller.getOneIncomeCategory
);

incomeCategoriesRouter.post(
  "/",
  authentication,
  Controller.createIncomeCategory
);

incomeCategoriesRouter.patch(
  "/:id",
  authentication,
  Controller.updateIncomeCategory
);

incomeCategoriesRouter.delete(
  "/:id",
  authentication,
  Controller.deleteIncomeCategory
);

module.exports = incomeCategoriesRouter;
