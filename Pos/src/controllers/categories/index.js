import {categoriesService} from "~/services/categories"
import { StatusCodes } from "http-status-codes";

const categoryCreatedController = async (req, res, next) => {
    try{
        const temporary = await categoriesService.createCategory(req.body);
        //có kết quả thì trả về cho client
        res.status(StatusCodes.CREATED).json(temporary);
    }catch(error){
        next(error);
    }
}

const categoryRemoveController = async (req, res, next) => {
    try{
        const removeCategory = await categoriesService.removeCategory(req.body);
        //có kết quả thì trả về cho client
        res.status(StatusCodes.CREATED).json(removeCategory);
    }catch(error){
        next(error);
    }
}
export const categoriesController = {
    categoryCreatedController,
    categoryRemoveController
};