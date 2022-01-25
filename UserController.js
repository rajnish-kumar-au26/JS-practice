const users = [];
let response = {};

const register = ({ name, email, password }) => {
  try {
    // Name Validation
    if (name.length < 5) {
      throw { message: "Name must be more than 5 char", status: 400 };
    }

    // Password Validation

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

response = register({
  name: "varun",
  email: "varun@gmail.com",
  password: "Varun@123",
});

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
  email: "varun@gmail.com",
  password: "Varun@123",
});

console.log(response);
