const users = [];
let response = {};

const register = ({ name, email, password }) => {
  try {
    // Name Validation
    if (name.length < 5) {
      throw { message: "Name must be more than 5 char", status: 400 };
    }

    // Email Validation
    if (email.length < 5) {
      throw { email: "email must be more than 5 char", status: 400 };
    }

    // Password Validation

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
  name: "varu",
  email: "varun@gmail.com",
  password: "Varun@123",
});

console.log("errorMessage", response);
