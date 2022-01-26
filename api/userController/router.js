const router = require('express').Router();
const userController = require('./controller');

router.get('/:id', userController.getUserById);

module.exports = router;
