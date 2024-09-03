import { brandModel } from "~/models/brandsModel";

const createNew = async (data) => {
  try {
    //Gọi tới tầng Model để xử lý lưu bản ghi brand vào database
    const response = await brandModel.createNew(data);

    //Lấy giá trị bản ghi trả về cho frontend
    const createdBrand = await brandModel.findOneById(response.insertedId);

    //Có thể làm thêm các xử lý logic khác với các collection khác
    //Bắn email, notification ....
    const result = {
      data: createdBrand,
      message: "Brand created successfully!",
    };
    return result;
  } catch (error) {
    //Không cần custom lỗi vì sẽ đẩy lên controller xử lý
    throw error;
  }
};

const updateOne = async (id, data) => {
  try {
    await brandModel.updateOneById(id, data);

    //Lấy giá trị bản ghi trả về cho frontend
    const updatedBrand = await brandModel.findOneById(id);

    const result = {
      data: updatedBrand,
      message: "Brand updated successfully!",
    };
    return result;
  } catch (error) {
    //Không cần custom lỗi vì sẽ đẩy lên controller xử lý
    throw error;
  }
};

export const brandService = {
  createNew,
  updateOne,
};
