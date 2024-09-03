import {categoriesModel} from "~/models/categoriesModel";
import {env} from "~/config/environment";


// ============= Tạo một category =========
const createCategory = async (reqBody) => {
    
    try{
        // tạo một category
        const categoryCreate = await categoriesModel.categoryCreate(reqBody);
        console.log(typeof(categoryCreate.insertedId))
        console.log(categoryCreate.insertedId)
        const category = await categoriesModel.findOneById(categoryCreate.insertedId);
        return {
            "categoryInfo": category,
        }
    }catch(error){
        next(error);
    }
    
    
}

// =============== Cập nhât category =======
const removeCategory = async (reqBody) => {
    try{
        // xóa một category
        const removeCategory = await categoriesModel.removeOneById(reqBody._id);
        return {"message": removeCategory};
    }catch(error){
        next(error);
    }
}

export const categoriesService = {
    createCategory,
    removeCategory
};