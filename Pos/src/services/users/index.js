import {userModel} from "~/models/usersModel";
import {env} from "~/config/environment";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userCreateService = async (reqBody) => {

    try{

        
        console.log(reqBody)
        console.log(reqBody.zaloId)

        
        // mã hóa hóa mật khẩu sử dụng zaloId
        const hashedPassword = await bcrypt.hash(reqBody.zaloId, 10)

        // tạo JWT tư zaloId
        const token = jwt.sign({zaloId: reqBody.zaloId}, env.JWT_SECRET, {
            expiresIn: '24h', // Token sẽ hết hàng sau 24h
        });

        // kiêm tra các tham sô mặc định 
        if (!reqBody.role){
            reqBody.role = "user";
        }

        if (!reqBody.status){
            reqBody.status = "active";
        }

        if (!reqBody.point){
            reqBody.point = 0;
        }

        if (!reqBody.membershipLevel){
            reqBody.membershipLevel = "free";
        }

        if (!reqBody.status){
            reqBody.status = "active";
        }
        
       
        // tạo đối tượng người dùng với maatk khẩu mã háo toke
        const newUser = {
            ...reqBody,
            createdAt: new Date().getTime(),
            updatedAt: null,
            password: hashedPassword,
            token: token,
        };
        
        // Gọi tới tầng Model để xử lý lưu bản ghi brand vào database
        const response = await userModel.userCreateNew(newUser);
        console.log("đã tạo thành công");
        // lấy giá trị bản ghi trả về cho fontend
        const userFindNew = await userModel.findOneByPhone(reqBody.phone);

        // data userInfo 
        const userInfo = {
            "name": null,
            "birthday": null,
            "phone": null,
            "role": null,
            "status": userFindNew.status,
            "point": userFindNew.point,
            "membershipLevel": userFindNew.membershipLevel,
            "photo": userFindNew.photo,
            "createdAt": userFindNew.createdAt,
            "updatedAt": userFindNew.updatedAt,

        }
        const result = {
            data: {
                userInfo: userInfo,
                token: userFindNew.token
            },
            message: "user created successfully!",
            
        }
        return result;
    }catch(error){
        throw error;
    }
}

// login
const userLoginService = async (reqBody) => {
    try{
        /**
         * 1 - kiểm tra email trong dbs
         * 2 - match password
         * 3 - tạo token
         * 4 - tạo ra một token mới
         * 5 - thêm vào data và return login
         */

        // lấy giá trị bản ghi trả về cho fontend
        const userFind = await userModel.findOneByPhone(reqBody.phone);
        // kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(reqBody.zaloId, userFind.password)

        if (!isPasswordValid){
            throw new Error("Invalid email or password")
        }

        // Tạo JWT
        const token = jwt.sign({ zaloId: userFind.zaloId }, env.JWT_SECRET, { expiresIn: "1h" });
        const filter = {zaloId: reqBody.zaloId};
        const update = {$set: { token: token }};

        const userUpdate = await userModel.updateOneByZaloId(filter, update);
        const userFindNew = await userModel.findOneByPhone(reqBody.phone);
        const dataInforUser = {
            "_id": userFindNew._id,
            "name": userFindNew.name,
            "phone": userFindNew.phone,
            "zaloId": userFindNew.zaloId,
            "photo": userFindNew.photo,
            "birthday": userFindNew.birthday,
            "role": userFindNew.role,
            "status": userFindNew.status,
            "point": userFindNew.point,
            "membershipLevel": userFindNew.membershipLevel,
            "createdAt": userFindNew.createdAt,
            "updatedAt": userFindNew.updatedAt,
        }

        const resultLogin = {
            data: {
                userInfo: dataInforUser
            },
            message: "Login successfully!",
            token: token,
        }
        return resultLogin;

        
        
        
    }catch(error){
        throw error;
    }
} 


// update profile user information
const updateProfile = async (reqBody) => {

    try{
        const filter = {zaloId: reqBody.zaloId};

        // tạo JWT tư zaloId
        const token = jwt.sign({zaloId: reqBody.zaloId}, env.JWT_SECRET, {
            expiresIn: '24h', // Token s�� hết hàng sau 24h
        });
        const update = {$set: { 
                                name: reqBody.name,
                                photo: reqBody.photo,
                                phone: reqBody.phone,
                                address: reqBody.address,
                                token: token }};
        
        const updated = await userModel.updateOneByZaloId(filter, update);

        const userFindNew = await userModel.findOneByPhone(reqBody.phone);
        const dataInforUser = {
            "_id": userFindNew._id,
            "name": userFindNew.name,
            "phone": userFindNew.phone,
            "zaloId": userFindNew.zaloId,
            "photo": userFindNew.photo,
            "birthday": userFindNew.birthday,
            "address": userFindNew.address,
            "role": userFindNew.role,
            "status": userFindNew.status,
            "point": userFindNew.point,
            "membershipLevel": userFindNew.membershipLevel,
        }

        const resultUpdated = {
            data: {
                userInfo: dataInforUser
            },
            message: "Updated successfully!",
            token: token,
        }
        return resultUpdated;

    }catch(error){
        next(error);
    }
}

// ============ Profile =================
const profile = async (reqBody) => {
    try{

        const user = await userModel.findOneByZaloId(reqBody.zaloId);

        if (!user){
            return {
                message: "User not found"
            }
        }
        const userInfo = {
            "_id": user._id,
            "name": user.name,
            "phone": user.phone,
            "zaloId": user.zaloId,
            "photo": user.photo,
            "birthday": user.birthday,
            "address": user.address,
            "role": user.role,
            "status": user.status,
            "point": user.point,
            "membershipLevel": user.membershipLevel,
        }
        return {
            data: {
                userInfo: userInfo
            },
            message: "User not found",
        }
    }catch(error){
        next(error);
    }
}
export const userService = {
    userCreateService,
    userLoginService,
    updateProfile,
    profile
};