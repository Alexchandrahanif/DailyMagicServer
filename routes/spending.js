const Controller = require("../controller/spending");

const spendingRouter = require("express").Router();

spendingRouter.get("/", Controller);

module.exports = spendingRouter;
