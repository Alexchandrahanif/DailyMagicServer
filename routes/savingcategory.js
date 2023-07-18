const Controller = require("../controller/savingCategory");
const authentication = require("../middleware/authentication");

const savingCategoryRouter = require("express").Router();

savingCategoryRouter.get("/", authentication, Controller.getAllSavingCategory);

savingCategoryRouter.get(
  "/:id",
  authentication,
  Controller.getOneSavingCategory
);

savingCategoryRouter.post("/", authentication, Controller.createSavingCategory);

savingCategoryRouter.patch(
  "/:id",
  authentication,
  Controller.updateSavingCategory
);

savingCategoryRouter.delete(
  "/:id",
  authentication,
  Controller.deleteSavingCategory
);

module.exports = savingCategoryRouter;
