const userService = require('./services/userService');
const productsService = require('./services/productService');
const blogService = require('./services/blogService');

// let response = userService.getAllUsers(10, 1);
// console.log(response);

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

let getAllProducts = productsService.getAllProduct();
console.log(getAllProducts);
