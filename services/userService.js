const users = require("../db/users.json");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const reqPath = path.join(__dirname, "../db/users.json");
const RESPONSES = require("../responses/constantResponses");
const MESSAGES = require("../messages/index");

class UserService {
  register = async ({ name, email, password }) => {
    try {
      //   Name Validation
      if (name.length < 5) {
        throw {
          message: MESSAGES.USERS.NAME_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      // Email Validation
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        throw {
          message: MESSAGES.USERS.EMAIL_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      // Password Validation
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!password.match(passw)) {
        throw {
          message: MESSAGES.USERS.PASSWORD_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      let findUser = users.filter((user) => user.email === email);
      if (findUser.length) {
        throw {
          message: MESSAGES.USERS.USER_EXIST,
          status: RESPONSES.BAD_REQUEST,
        };
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
        message: MESSAGES.USERS.REGISTER.SUCCESS,
        status: RESPONSES.SUCCESS,
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
        throw {
          status: RESPONSES.BAD_REQUEST,
          message: MESSAGES.USERS.GET_USER_BY_EMAIL.ERROR,
        };
      }
      return {
        message: MESSAGES.USERS.GET_USER_BY_EMAIL.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
        data: getUser[0],
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        error: true,
      };
    }
  };

  login = ({ email, password }) => {
    try {
      if (!email.length && !password.length) {
        throw {
          message: MESSAGES.USERS.LOGIN.ERROR,
          status: RESPONSES.BAD_REQUEST,
        };
      }
      // email validation
      const isEmail = users.filter((user) => user.email === email);
      if (!isEmail.length) {
        throw {
          message: MESSAGES.USERS.EMAIL_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      // password validation
      const isValidPass = bcrypt.compare(password, isEmail[0].password);
      if (!isValidPass) {
        throw {
          message: MESSAGES.USERS.PASSWORD_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      const token = "jyjtcux646rx76cry";
      return {
        message: MESSAGES.USERS.LOGIN.SUCCESS,
        status: RESPONSES.SUCCESS,
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
        throw {
          message: MESSAGES.USERS.USER_EXIST,
          error: true,
          status: RESPONSES.BAD_REQUEST,
        };
      }
      const dataLimit = limit * offset;
      const initialData = dataLimit - limit;
      let userData = users.slice(initialData, dataLimit);
      return {
        message: MESSAGES.USERS.SUCCESS,
        status: RESPONSES.SUCCESS,
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
        throw {
          message: MESSAGES.USERS.NAME_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }

      // password validation
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!password.match(passw)) {
        throw {
          message: MESSAGES.USERS.PASSWORD_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }

      const isemail = users.findIndex((user) => user.email == email);
      if (isemail === -1) {
        throw {
          message: MESSAGES.USERS.EMAIL_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
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
        message: MESSAGES.USERS.UPDATE_USER.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
      };
    } catch (error) {
      return { message: error.message, status: error.status, error: true };
    }
  };
}

module.exports = new UserService();
