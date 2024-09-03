import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";

//Khởi tạo một đối tượng posDatabaseInstance ban đầu là null (vì chúng ta chưa connect)
let posDatabaseInstance = null;

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  //Lưu ý: cái serverApi có từ phiên bản MongoDB 5.0.0 trở lên, có thể không cần dùng nó, còn nếu
  // dùng nó là chúng ta chỉ định một Stable Api Version của MôngDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//Kết nối tới Database
export const CONNECT_DB = async () => {
  //Gọi kết nối tới Mongo Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect();

  //Kết nối thành công thì lấy ra DB theo tên và gán ngược nó lại vào biến posDatabaseInstance ở trên
  posDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

//Đóng kết nối tới Database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

//Function Get_DB (không async) này có nhiệm vụ export ra cái Trello Database Instance sau khi đã connect thành công
//tới MongoDB để chúng ta sử dụng ở nhiều nơi khác nhau trong code
//Lưu ý phải đảm bảo chỉ luôn gọi cái getDb này sau khi đã kết nối thành công tới Database
export const GET_DB = () => {
  if (!posDatabaseInstance) throw new Error("Must connect to Database first!");
  return posDatabaseInstance;
};
