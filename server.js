const userService = require("./services/userService");
const productsService = require("./services/productService");
const blogService = require("./services/blogService");

let response = userService.getAllUsers(10, 1);

console.log(response);
