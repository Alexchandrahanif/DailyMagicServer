const Controller = require("../controller/undangan");

const undanganRouter = require("express").Router();

undanganRouter.get("/", Controller.getAll);
undanganRouter.post("/", Controller.create);
undanganRouter.patch("/:id", Controller.update);
undanganRouter.patch("/status/:id", Controller.updateStatus);
undanganRouter.get("/", Controller.delete);

module.exports = undanganRouter;
