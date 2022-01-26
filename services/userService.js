const users = require("../db/users.json");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const reqPath = path.join(__dirname, "../db/users.json");

class UserService {
  register = async ({ name, email, password }) => {
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
      const tt = await bcrypt.hash(password, 10);
      // console.log(tt);
      users.push({ id: v4(), name, email, password: tt });
      // console.log(users);
      fs.writeFile(reqPath, JSON.stringify(users), (error) => {
        if (error) {
          throw error;
        }
      });
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

  getUserByEmail = ({ email }) => {
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
  };

  login = ({ email, password }) => {
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

  getAllUsers = (limit = 10, offset = 1) => {
    try {
      if (!users.length) {
        throw { message: "No Data", error: true, status: 400 };
      }
      const dataLimit = limit * offset;
      const initialData = dataLimit - limit;
      let userData = users.slice(initialData, dataLimit);
      return {
        message: "Success",
        status: 200,
        count: users.length,
        error: false,
        data: userData,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status,
        error: error.error,
      };
    }
  };

  updateUser = ({ email, name, password }) => {
    try {
      // name validation
      if (name.length < 5) {
        throw { message: "name validation error", status: 400, error: true };
      }

      // password validation
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!password.match(passw)) {
        throw {
          message: "Password validation error",
          status: 400,
          error: true,
        };
      }

      const isemail = users.findIndex((user) => user.email == email);
      if (isemail === -1) {
        throw { message: "email is not regesterd", status: 400, error: true };
      }

      users[isemail].name = name;
      users[isemail].password = password;

      fs.writeFile(reqPath, JSON.stringify(users), (error) => {
        if (error) {
          throw error;
        }
      });

      return {
        message: "name and password changed sucesfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return { message: error.message, status: error.status, error: true };
    }
  };

  deleteUser = (id) => {
    try {
      if (!users.length) {
        throw { message: "No user found" };
      }
      const newUser = users.filter((user) => user.id !== id);

      if (users.length === newUser.length) {
        throw { message: "User doesn't exist", status: 400, error: true };
      }

      fs.writeFile(reqPath, JSON.stringify(newUser), (error) => {
        if (error) throw error;
      });
      return {
        message: "User deleted successfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return { message: error.message, status: error.status, error: true };
    }
  };
}

module.exports = new UserService();
