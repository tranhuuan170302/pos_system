import express from "express";
import { userController } from "~/controllers/users";
import { userValidation } from "~/validations/userValidation";

const Router = express.Router();

// Signup route
Router.route("/signup")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "NOTE: API get user" });
  })
  .put((req, res) => {})
  //.post((req, res, next) => {userController.userControllerCreate(req, res, next);});
  .post(userValidation.createNew, userController.userControllerCreate);
// Login route

Router.route("/login")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "NOTE: API get user" });
  })
  .put((req, res) => {})
  .post((req, res, next) => {userController.userControllerLogin(req, res, next);});


Router.route("/verify")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "NOTE: API get user" });
  })
  .put((req, res) => {})
  .post(userValidation.createNew, userController.verify);

//updating profile
Router.route("/updateProfile")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "NOTE: API get user" });
  })
  .put((req, res) => {})
  .post(userValidation.createNew, userController.updatedProfile);


Router.route("/profile")
.get(userValidation.createNew, userController.profile)
.put((req, res) => {})
.post((req, res) => {});

export const usersRouters = Router;
