import { StatusCodes } from "http-status-codes";
import { isValidObjectId } from "mongoose";
import ApiError from "~/utils/ApiError";

// Middleware kiểm tra id param có phải dạng ObjectId không
export const validateObjectIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    next(); // id hợp lệ, tiếp tục xử lý
  } else {
    next(new ApiError(StatusCodes.BAD_REQUEST, "Invalid ID"));
  }
};
