const Controller = require("../controller/income");

const incomeRouter = require("express").Router();

incomeRouter.get("/", Controller);

module.exports = incomeRouter;
