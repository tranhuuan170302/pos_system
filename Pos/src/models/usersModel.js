import Joi from "joi";
import { GET_DB } from "~/config/mongodb";

const USER_COLLECTION_NAME = "users";
const USER_COLLECTION_SCHEMA = Joi.object({
    name: Joi.string().required(),
    userName: Joi.string(),
    email: Joi.string(),
    zaloId: Joi.string().required(),
    password: Joi.string(),
    role: Joi.string().required().valid('admin', 'user', 'staff').default("user"),
    status: Joi.string().valid('active', 'inactive').default('active'),
    phone: Joi.string().required(),
    photo: Joi.string().required(),
    birthday: Joi.date(),
    address: Joi.string(),
    point: Joi.number().default(0),
    membershipLevel: Joi.string().valid('free', 'copper', 'silver', 
                                        'gold', 'diamond').default('free'),
    token: Joi.string(),
    createdAt: Joi.date().timestamp("javascript").default(Date.now),
    updatedAt: Joi.date().timestamp("javascript").default(null),
});

// tạo một function để thêm một member vào 
const userCreateNew = async (data) => {
    try{
        const result = await GET_DB()
                            .collection(USER_COLLECTION_NAME)
                            .insertOne(data)

        return result;
    }catch(error){
        throw new Error(error);
    }
};

// tạo một function để tìm member theo phone
const findOneByPhone = async (data) => {
    try{
        console.log(data)
        const result = await GET_DB()
                            .collection(USER_COLLECTION_NAME)
                            .findOne({phone: data});
        console.log("đã tìm kiếm");
        return result;
    }catch(error){
        throw new Error(error);
    }
}

const findOneByZaloId = async (data) => {
    try{
        const result = await GET_DB()
                            .collection(USER_COLLECTION_NAME)
                            .findOne({zaloId: data});
        console.log("đã tìm kiếm");
        return result;
    }catch(error){
        throw new Error(error);
    }
}
// cập nhật thông tin một user
const updateOneByZaloId = async (filter, update) => {
    try{
        const result = await GET_DB()
                            .collection(USER_COLLECTION_NAME)
                            .updateMany(filter, update);
        return result;
    }catch(error){
        throw new Error(error);
    }
}

export const userModel = {
    USER_COLLECTION_NAME,
    USER_COLLECTION_SCHEMA,
    userCreateNew,
    findOneByPhone,
    findOneByZaloId,
    updateOneByZaloId,
}

/*
{
    "name": "Nguyễn Hoàng Ngân",
    "phone": "0352933862",
    "zaloId": "19339662177",
    "photo": "/upload/imgase.jpg"
}
*/