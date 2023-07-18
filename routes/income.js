const Controller = require("../controller/income");
const authentication = require("../middleware/authentication");

const incomeRouter = require("express").Router();

incomeRouter.get("/", authentication, Controller.getAllIncome);

incomeRouter.get(
  "/detail/:UserId",
  authentication,
  Controller.getAllIncomeByUserId
);

incomeRouter.get("/:id", authentication, Controller.getOneIncome);

incomeRouter.post("/", authentication, Controller.createIncome);

incomeRouter.patch("/:id", authentication, Controller.updateIncome);

incomeRouter.delete("/:id", authentication, Controller.deleteIncome);

module.exports = incomeRouter;
