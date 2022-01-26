const userService = require("./services/userService");
const productsService = require("./services/productService");
const blogService = require("./services/blogService");

// let response = userService.getAllUsers(10, 1);
let response = {};

// response = blogService.addBlog({
//   title: "test blog title 1",
//   description: "test blog description",
//   photo:
//     "https://cdn.dribbble.com/users/175710/screenshots/16266258/media/d867642dabdd68852fcd74b947b76c6e.png",
// });

// let blo = "e4c6a841-4ad3-4753-be10-f9cfb4500891";
// response = blogService.updateBlog(blo, {
//   title: "update title",
//   description: "update description",
//   photo: "dsjidsjidjiij",
// });

// const blogId = "3957e2e0-36c1-4487-9550-25fd5ed0b7e5";
// // response = blogService.deleteBlog(blogId);

// response = blogService.getBlogById(blogId);
response = blogService.getAllBlog();

console.log(response);
