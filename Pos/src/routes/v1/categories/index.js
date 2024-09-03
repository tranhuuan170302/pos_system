import express from "express";
import {categoriesController} from "~/controllers/categories";

const Router = express.Router();

Router.route("/categoriesNew")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "NOTE: API get user" });
  })
  .put((req, res) => {})
  //.post((req, res, next) => {userController.userControllerCreate(req, res, next);});
  .post((req, res, next) => {categoriesController.categoryCreatedController(req, res, next);});


// =========== Remove Category ===============
Router.route("/categoriesRemove")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "NOTE: API get user" });
  })
  .put((req, res) => {})
  //.post((req, res, next) => {userController.userControllerCreate(req, res, next);});
  .post((req, res, next) => {})
  .delete((req, res, next) => {categoriesController.categoryRemoveController(req, res, next);})
export const categoriesRouters = Router;