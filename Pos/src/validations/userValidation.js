import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
const createNew = async (req, res, next) => {
  // res.Status(StatusCodes.CREATED).json({message: "Post: API create new"})
  const correctCondition = Joi.object({
    name: Joi.string().messages({
      "string.empty": "Nmae is not allowed to be empty",
    }),
    email: Joi.string().messages({
      "any.required": "email is not required",
      "string.empty": "email is have empty",
    }),
    zaloId: Joi.string().required().messages({
      "any.required": "zaloId is required",
      "string.empty": "ZaloId is not empty",
    }),

    phone: Joi.string().messages({
      "any.required": "phone is required",
      "string.empty": "phone is not allowed to be empty",
    }),
    photo: Joi.string().messages({
      "string.empty": "Photo is not allowed to be empty",
    }),

    birthday: Joi.date().iso().less("now").messages({
      "date.base": "Birthday must be a valid date",
      "date.format": "Birthday must be in ISO format (YYYY-MM-DD)",
      "date.less": "Birthday must be in the past",
    }),

    address: Joi.string(),
    // add more filed if necessary
    role: Joi.string()
      .valid("admin", "user", "staff")
      .default("user") // Assign default value if not provided
      .messages({
        "any.only": "role level must be one of 'admin', 'user', 'staff'.",
      }),

    password: Joi.string(),
    membershipLevel: Joi.string(),

    point: Joi.number().default(0).messages({
      "any.only": "Point is number integer",
    }),

    status: Joi.string()
      .valid("active", "inactive")
      .default("active")
      .messages({
        "any.only": "status must be one of 'active', 'inactive'",
      }),
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

export const userValidation = {
  createNew,
};
