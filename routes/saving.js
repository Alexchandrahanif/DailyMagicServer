const Controller = require("../controller/saving");
const authentication = require("../middleware/authentication");

const savingRouter = require("express").Router();

savingRouter.get("/", authentication, Controller.getAllSaving);

savingRouter.get(
  "/detail/:UserId",
  authentication,
  Controller.getAllSavingByUserId
);

savingRouter.get("/:id", authentication, Controller.getOneSaving);

savingRouter.post("/", authentication, Controller.createSaving);

savingRouter.patch("/:id", authentication, Controller.updateSaving);

savingRouter.delete("/:id", authentication, Controller.deleteSaving);

module.exports = savingRouter;
