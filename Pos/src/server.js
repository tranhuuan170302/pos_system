import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, CLOSE_DB } from "~/config/mongodb";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware";
import { env } from "~/config/environment";

const port = env.APP_PORT;

const START_SERVER = () => {
  //Khởi tạo app
  const app = express();

  //Enable req.body json data
  app.use(express.json());

  //Sử dụng api v1
  app.use("/v1", APIs_V1);

  //Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware);

  //Listening port đang chạy
  app.listen(port, () => console.log("Starting server on port " + port));

  //Thực hiện các tác vụ cleanup trước khi dùng server
  exitHook(() => CLOSE_DB());
};

// Khi kết nối tới database thành công thì mới Start Server Back-end lên
// Imediately-invoked / Anonymous Async Functions (IIFE)
(async () => {
  try {
    console.log("1. Connecting to MongoDB Cloud Atlas...");
    await CONNECT_DB();
    console.log("2. Connected to MongoDB Cloud Atlas");
    //Khởi động Server Backend sau khi connect db thành công
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0); //dừng server
  }
})();
