const userService = require("../../services/userService");
const walletService = require("../../services/walletService");

class userController {
  getUserById = (req, res) => {
    const id = req.params.id;
    const userRes = userService.getUserByEmail({ email: id });
    return res.status(userRes.status).send({
      message: userRes.message,
      error: userRes.error,
      data: userRes.data,
    });
  };

  register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const registerUser = await userService.register({
        name: name,
        email: email,
        password: password,
      });
      if (registerUser.error) {
        throw registerUser;
      }
      const userInfo = await userService.getUserByEmail({ email });

      if (userInfo.error) {
        throw userInfo;
      }

      const walletRes = await walletService.create({
        userId: userInfo.data.id,
        amount: 0,
        currency: "INR",
      });

      if (walletRes.error) throw walletRes;

      return res.status(registerUser.status).send({
        message: registerUser.message,
        error: registerUser.error,
      });
    } catch (error) {
      return res.status(error.status).send({
        message: error.message,
        error: error.error,
      });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const loginUser = await userService.login({
      email: email,
      password: password,
    });
    return res.status(loginUser.status).send({
      message: loginUser.message,
      error: loginUser.error,
      data: loginUser.data,
    });
  };

  getAllUser = (req, res) => {
    let limit = parseInt(req.params.limit);
    let offset = parseInt(req.params.offset);
    const getUsers = userService.getAllUsers(limit, offset);
    return res.status(getUsers.status).send({
      message: getUsers.message,
      count: getUsers.count,
      error: getUsers.error,
      data: getUsers.data,
    });
  };

  updateUser = (req, res) => {
    const { email, name, password } = req.body;
    const updateUser = userService.updateUser({
      email: email,
      name: name,
      password: password,
    });
    return res
      .status(updateUser.status)
      .send({ message: updateUser.message, error: updateUser.error });
  };

  deleteUser = (req, res) => {
    const { id } = req.body;
    const deleteUser = userService.deleteUser(id);
    return res
      .status(deleteUser.status)
      .send({ message: deleteUser.message, error: deleteUser.error });
  };
}

module.exports = new userController();
