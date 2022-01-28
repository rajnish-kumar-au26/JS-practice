const router = require("express").Router();
const blogController = require("./controller");
const jwt = require("../../middleware/jwtValidation");

router.post("/create", jwt.verifyToken, blogController.addBlog);
router.put("/update", jwt.verifyToken, blogController.updateBlog);
router.delete("/delete", jwt.verifyToken, blogController.deleteBlog);
router.get("/", jwt.verifyToken, blogController.getBlogById);
router.get("/list/:limit/:offset", jwt.verifyToken, blogController.getAllBlog);

module.exports = router;
