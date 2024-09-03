import Joi from "joi";
import { GET_DB } from "~/config/mongodb";
import {objectId} from "~/utils/formatters.js"

import {Schema, ObjectId} from "mongodb";
// name collection
const CATEGORY_COLLECTION_NAME = "categories";
const CATEGORY_COLLECTION_SCHEMA = Joi.object({
    categoryName: Joi.string().required(),
    categorySlug: Joi.string().required(),
    categoryStatus: Joi.string().valid('active', 'inactive').default('active'),
    createdAt: Joi.date().iso().default(() => new Date().toISOString()),
    updatedAt: Joi.date().iso().default(null),
    categoryNumber: objectId().required(),
})

// tạo một function để thêm một category vào 
const categoryCreate = async (data) => {
    try{
        const result = await GET_DB()
                            .collection(CATEGORY_COLLECTION_NAME)
                            .insertOne(data)

        return result;
    }catch(error){
        throw new Error(error);
    }
};

// tạo một function để tìm category theo id
const findOneById = async (data) => {
    try{
        
        const result = await GET_DB()
                            .collection(CATEGORY_COLLECTION_NAME)
                            .findOne({_id: data});
       
        return result;
    }catch(error){
        throw new Error(error);
    }
}

// xóa một categories
const removeOneById = async(data) => {
    try{
        
        const objectIdData = new ObjectId(data); 
        console.log(typeof(objectIdData))
        console.log(objectIdData)
        // convert data to number
        const isCategory = await findOneById(objectIdData);

        if (isCategory){
            const result = await GET_DB()
                                .collection(CATEGORY_COLLECTION_NAME)
                                .deleteOne({_id: objectIdData});
            return "sucessfully";
        }else{
            return "Invalied";
        }
        
    }catch(error){
        next(error);
    }
}

export const categoriesModel = {
    CATEGORY_COLLECTION_NAME,
    CATEGORY_COLLECTION_SCHEMA,
    categoryCreate,
    findOneById,
    removeOneById
}