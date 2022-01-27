const router = require("express").Router();
const userController = require("./controller");
const jwt = require("../../middleware/jwtValidation");

router.get("/:id", jwt.verifiedToken, userController.getUserById);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/update", jwt.verifiedToken, userController.updateUser);
router.delete("/delete", jwt.verifiedToken, userController.deleteUser);
router.get(
  "/list/:limit/:offset",
  jwt.verifiedToken,
  userController.getAllUser
);

module.exports = router;
