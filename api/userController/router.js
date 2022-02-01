const router = require('express').Router();
const userController = require('./controller');
const jwt = require('../../middleware/jwtValidation');

router.get('/:id', jwt.verifyToken, userController.getUserById);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update', jwt.verifyToken, userController.updateUser);
router.delete('/delete', jwt.verifyToken, userController.deleteUser);
router.get('/list/:limit/:offset', jwt.verifyToken, userController.getAllUser);

module.exports = router;
