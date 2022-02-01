const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./api/userController/router");
const productRouter = require("./api/productController/router");
const blogRouter = require("./api/blogController/router");
const walletRouter = require("./api/walletController/router");

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/blog", blogRouter);
app.use("/wallet", walletRouter);

app.listen(4000, () => console.log("Server is running on port 4000"));
