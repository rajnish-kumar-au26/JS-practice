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
