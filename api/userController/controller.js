const userService = require('../../services/userService');

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
}

module.exports = new userController();
