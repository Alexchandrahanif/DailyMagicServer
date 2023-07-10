const Controller = require("../controller/savingCategory");

const savingCategoryRouter = require("express").Router();

savingCategoryRouter.get("/", Controller.getAllSavingCategory);

savingCategoryRouter.get("/:id", Controller.getOneSavingCategory);

savingCategoryRouter.post("/", Controller.createSavingCategory);

savingCategoryRouter.patch("/:id", Controller.updateSavingCategory);

savingCategoryRouter.delete("/:id", Controller.deleteSavingCategory);

module.exports = savingCategoryRouter;
