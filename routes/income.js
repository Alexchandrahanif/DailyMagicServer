const Controller = require("../controller/income");

const incomeRouter = require("express").Router();

incomeRouter.get("/", Controller.getAllIncome);

incomeRouter.get("/:id", Controller.getOneIncome);

incomeRouter.post("/", Controller.createIncome);

incomeRouter.patch("/:id", Controller.updateIncome);

incomeRouter.delete("/:id", Controller.deleteIncome);

module.exports = incomeRouter;
