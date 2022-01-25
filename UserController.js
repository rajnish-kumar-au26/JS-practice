const users = [];
let response = {};

const register = ({ name, email, password }) => {
  try {
    // Name Validation
    if (name.length < 5) {
      throw { message: 'Name must be more than 5 char', status: 400 };
    }

    // Email Validation
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      throw {
        message: 'You have entered an invalid email address!',
        status: 400,
      };
    }

    // Password Validation

    users.push({ name, email, password });
    return {
      message: 'User added successfully',
      status: 200,
      error: false,
      // data: users,
    };
  } catch (error) {
    return { message: error.message, status: error.status, error: true };
  }
};

response = register({
  name: 'varun',
  email: 'varun@gmail.com',
  password: 'Varun@123',
});

// Name must be more than 5 char
// Email must be valid
// Password must contains 1 numeric, 1Uppercase, and more than 8 char

// console.log(users);
console.log('errorMessage', response);
