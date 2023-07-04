const Controller = require("../controller/user");
const upload = require("../helper/multer");
const userRouter = require("express").Router();
const authentication = require("../middleware/authentication");

const photoUser = upload();

userRouter.post(
  "/register",
  photoUser.single("photoUser"),
  Controller.register
);

userRouter.post("/login", Controller.login);

userRouter.get("/", authentication, Controller.getAllUsers);

userRouter.get("/:id", authentication, Controller.getOneUser);

module.exports = userRouter;
