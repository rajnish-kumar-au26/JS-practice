const router = require("express").Router();
const WalletController = require("./controller");
const jwt = require("../../middleware/jwtValidation");

router.post("/deposit", jwt.verifyToken, WalletController.depositService);
router.post("/withdrawal", jwt.verifyToken, WalletController.withdrawalService);
router.get("/", jwt.verifyToken, WalletController.getWalletByUserId);

module.exports = router;
