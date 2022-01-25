const users = [];
let response = {};

const register = ({ name, email, password }) => {
  try {
    // Name Validation
    if (name.length < 5) {
      throw { message: "Name must be more than 5 char", status: 400 };
    }

    // Email Validation

    // Password Validation
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!password.match(passw)) {
      throw { message: "Password validation error", status: 400 };
    }

    users.push({ name, email, password });
    return {
      message: "User added successfully",
      status: 200,
      error: false,
      data: users,
    };
  } catch (error) {
    return { message: error.message, status: error.status, error: true };
  }
};

response = register({
  name: "Shekhar",
  email: "varun@gmail.com",
  password: "Qwerty@!12344",
});

// Name must be more than 5 char
// Email must be valid
// Password must contains 1 numeric, 1Uppercase, and more than 8 char

// console.log(users);
console.log("errorMessage", response);
