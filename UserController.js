const users = [
  {
    name: "subu haldar",
    email: "subu@gmail.com",
    password: "Subuhld@123",
  },
];

const userData = require("./users.json");
let response = {};

const register = ({ name, email, password }) => {
  try {
    //   Name Validation
    if (name.length < 5) {
      throw { message: "Name must be more than 5 char", status: 400 };
    }

    // Email Validation
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      throw {
        message: "You have entered an invalid email address!",
        status: 400,
      };
    }

    // Password Validation
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!password.match(passw)) {
      throw { message: "Password validation error", status: 400 };
    }

    let findUser = users.filter((user) => user.email === email);
    if (findUser.length) {
      throw { message: "Email already exist", status: 400 };
    }

    users.push({ name, email, password });
    return {
      message: "User added successfully",
      status: 200,
      error: false,
      // data: users,
    };
  } catch (error) {
    return { message: error.message, status: error.status, error: true };
  }
};

function getUserByEmail({ email }) {
  try {
    let getUser = users.filter((user) => user.email === email);
    if (!getUser.length) {
      throw { status: 400, message: "user is not found" };
    }
    return {
      message: "User found successfully",
      status: 200,
      error: false,
      data: getUser[0],
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.status ? error.status : 400,
      error: true,
    };
  }
}

// response = register({
//   name: 'subu haldar',
//   email: 'subu@gmail.com',
//   password: 'Subuhld@123',
// });

response = getUserByEmail({ email: "subu@gmail.com" });

// login function
const login = ({ email, password }) => {
  try {
    // email validation
    const isEmail = users.filter((user) => user.email === email);
    if (!isEmail.length) {
      throw { message: "email id not register", status: "400" };
    }

    // password validation
    if (isEmail[0].password != password) {
      throw { message: "incorrect password", status: "400" };
    }

    const token = "jyjtcux646rx76cry";
    return {
      message: "User successfully logged in",
      status: 200,
      error: false,
      data: { token: token },
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.status,
      error: true,
    };
  }
};

response = login({
  email: "subu@gmail.com",
  password: "Subuhld@123",
});

// console.log(response);

// get users by limit and offset
// const GetData = ({limit,offset})=>{
//   try{
//     const userDatalen = userData.length

//     if(us)
//   }
// }

const Users = require("./users.json");

// users = 100 records

// records = 1 to 10

// limit = 10
// offset = 3

// records = 21 to 30

// limit = 6
// offset = 1
// records = 1 to 6

// limit = 6
// offset = 2
// records = 7 to 12

// limit = 6
// offset = 5
// records = 25 to 30

// limit = 6
// offset = 3
// records = 13 to 18

// const pagination = (limit, offset) => {
//   const dataLimit = limit * offset;
//   const findUser = Users.slice(dataLimit, limit);
//   console.log(findUser);
// };

function pagination(limit = 10, offset = 1) {
  try {
    if (!Users.length) {
      throw { message: "No Data", error: true, status: 400 };
    }
    const dataLimit = limit * offset;
    const initialData = dataLimit - limit;
    let userData = Users.slice(initialData, dataLimit);
    return {
      message: "Success",
      status: 200,
      count: Users.length,
      error: false,
      data: userData,
    };
  } catch (error) {
    return { message: error.message, status: error.status, error: error.error };
  }
}
const limit = 5;
const offset = 2;
// pagination(limit, offset);
console.log(pagination());
