const router = require("express").Router();
const paymentController = require("./controller");
const jwt = require("../../middleware/jwtValidation");

router.post("/product/:id", jwt.verifyToken, paymentController.buyProduct);

module.exports = router;
