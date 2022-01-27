const userService = require('./services/userService');
const productsService = require('./services/productService');
const blogService = require('./services/blogService');

let responses = userService.login({
  email: 'rahul@gmail.com',
  password: 'Rahul@123',
});
console.log(responses);

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./api/userController/router');

app.use('/user', userRouter);

app.listen(4000, () => console.log('Server is running on port 4000'));
