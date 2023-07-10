const Controller = require("../controller/spending");

const spendingRouter = require("express").Router();

spendingRouter.get("/", Controller.getAllSpending);

spendingRouter.get("/detail/:UserId", Controller);

spendingRouter.get("/:id", Controller.getOneSpending);

spendingRouter.post("/", Controller.createSpending);

spendingRouter.patch("/:id", Controller.updateSpending);

spendingRouter.delete("/:id", Controller.deleteSpending);

module.exports = spendingRouter;
