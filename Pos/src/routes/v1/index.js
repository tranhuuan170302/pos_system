import express from "express";
import { brandsRoutes } from "./brands";
import { usersRouters} from "./users";
import {categoriesRouters} from "./categories";

const Router = express.Router();

Router.use("/brands", brandsRoutes);
Router.use("/users", usersRouters);
Router.use("/categories", categoriesRouters);
export const APIs_V1 = Router;
