import { StatusCodes } from "http-status-codes";
import { brandModel } from "~/models/brandsModel";
import { brandService } from "~/services/brands";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  try {
    //Điều hướng dữ liệu sang tầng Service
    const createBrand = await brandService.createNew(req.body);

    //Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createBrand);
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    //Kiểm tra sự tồn tại của phần tử trong db
    const brand = await brandModel.findOneById(id);

    //Brand không tồn tại
    if (!brand) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Brand not found");
    }

    const updateData = {
      ...req.body,
      createdAt: brand.createdAt, //Lấy lại thời gian khởi tạo
    };
    const updatedBrand = await brandService.updateOne(id, updateData);

    res.status(StatusCodes.OK).json(updatedBrand);
  } catch (error) {
    next(error);
  }
};

export const brandController = {
  createNew,
  updateOne,
};
