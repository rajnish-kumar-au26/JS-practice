const userService = require("./services/userService");
const productsService = require("./services/productService");
const blogService = require("./services/blogService");

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let response = userService.login({
  email: "rahul@gmail.com",
  password: "Rahul@123",
});

console.log(response);

const userRouter = require("./api/userController/router");
const { getUserByEmail } = require("./services/userService");

app.use("/user", userRouter);

app.listen(4000, () => console.log("Server is running on port 4000"));
