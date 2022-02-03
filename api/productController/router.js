const router = require("express").Router();
const productController = require("./controller");
const jwt = require("../../middleware/jwtValidation");

router.post("/add", jwt.verifyToken, productController.createProduct);
router.put("/update", jwt.verifyToken, productController.updateProducts);
router.get(
  "/list/:limit/:offset",
  jwt.verifyToken,
  productController.getAllProducts
);
router.delete("/delete", jwt.verifyToken, productController.deleteProducts);
router.get("/:id", jwt.verifyToken, productController.getProducts);

router.get(
  "/transaction/list",
  jwt.verifyToken,
  productController.getTransaction
);

module.exports = router;
