const Controller = require("../controller/user");
const upload = require("../helper/multer");
const userRouter = require("express").Router();
const authentication = require("../middleware/authentication");

const photoUser = upload();

// userRouter.get("/", authentication, Controller.getAllUsers);

// userRouter.get("/:id", authentication, Controller.getOneUser);

userRouter.post(
  "/register",
  photoUser.single("photoUser"),
  Controller.register
);

userRouter.post("/login", Controller.login);

userRouter.patch(
  "/updateUser/:id",
  photoUser.single("photoUser"),
  authentication
  //   Controller.updateUser
);

userRouter.patch(
  "/updateNumber/:id",
  authentication
  //   Controller.updatePhoneNumber
);

userRouter.patch(
  "/flagDeleted/:id",
  authentication
  //   Controller.changeStatusFlagDelete
);

userRouter.patch(
  "/updateStatusActive/:id",
  authentication
  //   Controller.updateStatusActive
);

userRouter.patch(
  "/updateEmailPassword/:id",
  authentication
  //   Controller.updateEmailPassword
);

module.exports = userRouter;
