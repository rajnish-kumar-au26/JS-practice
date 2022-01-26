const userService = require("./services/userService");
const productsService = require("./services/productService");
const blogService = require("./services/blogService");

// let response = userService.getAllUsers(10, 1);
// let response = {};

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
// response = blogService.getAllBlog();

// // for test addProduct Function

// let responseProduct = productsService.addProduct({
//   name: 'tata',
//   description: 'tata watch',
//   price: '5000',
//   image: 'tataimagelink',
// });
// console.log(responseProduct);

// // for test update function

// let product = {
//   name: 'sabu',
//   description: 'subu titan watch',
//   price: '5000',
//   image: 'imagelinkupdated',
// };
// let id = '5d80a554-6de7-4d0e-ac93-1dbb2f18807a';
// let responseProductUpdate = productsService.updateProduct(id, product);
// console.log(responseProductUpdate);

// //for test deleteProduct function

// let id = 'c6368326-6a33-41ac-8491-e0d29b11f1d1';
// let responseDeleteProduct = productsService.deleteProduct(id);
// console.log(responseDeleteProduct);

// // get ProductbyID test function

// let id = '09f07ec8-dccb-4411-899e-d91951424ae3';
// let data = productsService.getProduct(id);
// console.log(data);

// // get allProducts function test

// let getAllProducts = productsService.getAllProduct();
// console.log(getAllProducts);
