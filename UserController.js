const users = [
  {
    name: 'subu haldar',
    email: 'subu@gmail.com',
    password: 'Subuhld@123',
  },
];
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
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!password.match(passw)) {
      throw { message: 'Password validation error', status: 400 };
    }

    let findUser = users.filter((user) => user.email === email);
    if (findUser.length) {
      throw { message: 'Email already exist', status: 400 };
    }

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

function getUserByEmail({ email }) {
  try {
    let getUser = users.filter((user) => user.email === email);
    if (!getUser.length) {
      throw { status: 400, message: 'user is not found' };
    }
    return {
      message: 'User found successfully',
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

response = getUserByEmail({ email: 'subu@gmail.com' });

// login function
const login = ({ email, password }) => {
  try {
    // email validation
    const isEmail = users.filter((user) => user.email === email);
    if (!isEmail.length) {
      throw { message: 'email id not register', status: '400' };
    }

    // password validation
    if (isEmail[0].password != password) {
      throw { message: 'incorrect password', status: '400' };
    }

    const token = 'jyjtcux646rx76cry';
    return {
      message: 'User successfully logged in',
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
  email: 'varun@gmail.com',
  password: 'Varun@123',
});

console.log(response);
