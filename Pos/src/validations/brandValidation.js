import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().max(50).trim().strict().message({
      "any.required": "Name is required",
      "string.empty": "Name is not allowed to be empty",
      "string.max": "Name must be at most 50 characters long",
      "string.trim": "Name must not have leading or trailing whitespace",
    }),
    slug: Joi.string().required().max(256).trim().strict().message({
      "any.required": "Slug is required",
      "string.empty": "Slug is not allowed to be empty",
      "string.max": "Slug must be at most 100 characters long",
      "string.trim": "Slug must not have leading or trailing whitespace",
    }),
    image: Joi.array().items(Joi.string()),
  });

  try {
    // Chỉ định abortEarly: false để trả về tất cả lỗi validation
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    //Validate đúng => Chuyển qua controller
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
  }
};

export const brandValidation = {
  createNew,
};
