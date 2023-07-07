const Controller = require("../controller/saving");

const savingRouter = require("express").Router();

savingRouter.get("/", Controller.getAllSaving);

savingRouter.get("/:id", Controller.getOneSaving);

savingRouter.post("/", Controller.createSaving);

savingRouter.patch("/:id", Controller.updateSaving);

savingRouter.delete("/:id", Controller.deleteSaving);

module.exports = savingRouter;
