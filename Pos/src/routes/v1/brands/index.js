import express from "express";
import { StatusCodes } from "http-status-codes";
import { brandController } from "~/controllers/brands";
import { validateObjectIdMiddleware } from "~/middlewares/validateObjectIdMiddleware";
import { brandValidation } from "~/validations/brandValidation";

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "NOTE: API get brands" });
  })
  .post(brandValidation.createNew, brandController.createNew);

Router.route("/:id").put(
  validateObjectIdMiddleware,
  brandValidation.createNew,
  brandController.updateOne
);

export const brandsRoutes = Router;
