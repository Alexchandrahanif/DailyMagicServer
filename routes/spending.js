const Controller = require("../controller/spending");
const authentication = require("../middleware/authentication");

const spendingRouter = require("express").Router();

spendingRouter.get("/", authentication, Controller.getAllSpending);

spendingRouter.get(
  "/detail/:UserId",
  authentication,
  Controller.getAllSpendingByUserId
);

spendingRouter.get("/:id", authentication, Controller.getOneSpending);

spendingRouter.post("/", authentication, Controller.createSpending);

spendingRouter.patch("/:id", authentication, Controller.updateSpending);

spendingRouter.delete("/:id", authentication, Controller.deleteSpending);

module.exports = spendingRouter;
