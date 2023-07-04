const Controller = require("../controller/saving");

const savingRouter = require("express").Router();

savingRouter.get("/", Controller);

module.exports = savingRouter;
