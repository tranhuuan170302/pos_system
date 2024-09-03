import {userService} from "~/services/users"
import { StatusCodes } from "http-status-codes";
import {userModel} from "~/models/usersModel";
const userControllerCreate = async (req, res, next) => {

    try{
        console.log("Đang ở userController");
        //Điều hướng dữ liệu sang tầng Service
        const userCreate = await userService.userCreateService(req.body);

        //có kết quả thì trả về cho client
        res.status(StatusCodes.CREATED).json(userCreate);

        console.log("Đang kết thúc userController");
    }catch(error){
        next(error);
    }
}

const userControllerLogin = async (req, res, next) => {
    try{

        // Điều hướng dữ liệu sang tầng service
        const userFind = await userService.userLoginService(req.body);
        //có kết quả thì trả về cho client
        res.status(StatusCodes.CREATED).json(userFind);
    }catch(error){
        next(error);
    }
}

const verify = async (req, res, next) => {

    try{
        const reqBody = req.body;
        // Kiểm tra xem điện thoại đã tồn tại chưa
        // Nếu tồn tại thì đăng nhập, nếu không tồn tại thì tạo mới
        // Cả 2 trường hợp sẽ trả về giá trị đã tạo hoặc đã đăng nhập.
        // Trả về kết quả đăng nhập hoặc tạo mới vào fontend.

        // đây là code để check điện thoại đã tồn tại chưa
        // Thay thế bằng code liên quan đến database hoặc API nào đó để kiểm tra điện thoại đã tồn tại

        // lấy giá trị bản ghi trả về cho fontend
        const userFind = await userModel.findOneByZaloId(reqBody.zaloId);

        if (userFind){
            console.log("login user created");
            //Điều hướng dữ liệu sang tầng Service
            const userCreate = await userService.userLoginService(req.body);
            console.log("login user created");
            //có kết quả thì trả về cho client
            res.status(StatusCodes.CREATED).json(userCreate);

        }else{
            // Điều hướng dữ liệu sang tầng service
            const userFind1 = await userService.userCreateService(req.body);
            //có kết quả thì trả về cho client
            res.status(StatusCodes.CREATED).json(userFind1);
        }

    }catch(error){
        next(error);
    }
    
}

const updatedProfile = async (req, res, next) => {

    try{
        const updatedProfile = await userService.updateProfile(req.body);
        res.status(StatusCodes.CREATED).json(updatedProfile);
    }catch(error){
        next(error);
    }
}

const profile = async (req, res, next) => {
    try{
        const profile = await userService.profile(req.body);
        res.status(StatusCodes.CREATED).json(profile);
    }catch(error){
        next(error);
    }
}
export const userController = {
    userControllerCreate,
    userControllerLogin,
    verify,
    updatedProfile,
    profile
};