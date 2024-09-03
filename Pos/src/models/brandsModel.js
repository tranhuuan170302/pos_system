import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";

const BRAND_COLLECTION_NAME = "brands";
const BRAND_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().max(50).trim().strict(),
  slug: Joi.string().required().max(256).trim().strict(),
  image: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date()
    .iso()
    .default(() => new Date().toISOString()), // Lưu dưới dạng ISO 8601
  updatedAt: Joi.date().iso().default(null), // Cập nhật dưới dạng ISO 8601
  _destroy: Joi.boolean().default(false),
});

const validateBeforeCreate = async (data) => {
  return await BRAND_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    return await GET_DB()
      .collection(BRAND_COLLECTION_NAME)
      .insertOne(validData);
  } catch (error) {
    throw new Error(error);
  }
};

const updateOneById = async (id, data) => {
  try {
    const validData = await validateBeforeCreate(data);

    // Cập nhật thời gian update
    validData.updatedAt = new Date();

    const result = await GET_DB()
      .collection(BRAND_COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(`${id}`) }, // Query
        { $set: validData } // Data set update
      );

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(BRAND_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(`${id}`),
      });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const brandModel = {
  BRAND_COLLECTION_NAME,
  BRAND_COLLECTION_SCHEMA,
  createNew,
  updateOneById,
  findOneById,
};
