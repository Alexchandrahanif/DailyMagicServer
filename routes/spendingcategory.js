const Controller = require("../controller/spendingCategory");
const authentication = require("../middleware/authentication");

const spendingCategoriesRouter = require("express").Router();

spendingCategoriesRouter.get(
  "/",
  authentication,
  Controller.getAllSpendingCategory
);

spendingCategoriesRouter.get(
  "/:id",
  authentication,
  Controller.getOneSpendingCategory
);

spendingCategoriesRouter.post(
  "/",
  authentication,
  Controller.createSpendingCategory
);

spendingCategoriesRouter.patch(
  "/:id",
  authentication,
  Controller.updateSpendingCategory
);

spendingCategoriesRouter.delete(
  "/:id",
  authentication,
  Controller.deleteSpendingCategory
);

module.exports = spendingCategoriesRouter;
