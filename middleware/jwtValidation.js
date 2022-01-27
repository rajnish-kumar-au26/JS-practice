const jwt = require('jsonwebtoken');
const Secret = 'mysecret';
const MESSAGES = require('../messages/index');
const RESPONSES = require('../responses/constantResponses');

class JwtValidation {
  generateToken = (userId) => {
    try {
      if (!userId) {
        throw {
          message: MESSAGES.JWT_VALIDATION.GENERATE_TOKEN.ERROR,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      const token = jwt.sign({ userId }, Secret, { expiresIn: '10h' });

      return {
        message: MESSAGES.JWT_VALIDATION.GENERATE_TOKEN.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
        data: token,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status,
        error: true,
      };
    }
  };

  verifiedToken = (req, res, next) => {
    try {
      const token = req.header['authorization'];
      var usersId = jwt.verify(token, Secret);

      req.userId = usersId;
      next();
    } catch (error) {
      res.status(RESPONSES.UNAUTHORIZED).send({
        message: MESSAGES.JWT_VALIDATION.VERIFIED_TOKEN.INVALID_TOKEN,
        error: true,
      });
    }
  };
}

module.exports = new JwtValidation();
