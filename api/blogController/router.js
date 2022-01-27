const router = require("express").Router();
const blogController = require("./controller");
const jwt = require("../../middleware/jwtValidation");

router.post("/create", jwt.verifiedToken, blogController.addBlog);
router.put("/update", jwt.verifiedToken, blogController.updateBlog);
router.delete("/delete", jwt.verifiedToken, blogController.deleteBlog);
router.get("/:id", jwt.verifiedToken, blogController.getBlogById);
router.get(
  "/list/:limit/:offset",
  jwt.verifiedToken,
  blogController.getAllBlog
);

module.exports = router;
