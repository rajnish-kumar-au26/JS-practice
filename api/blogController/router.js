const router = require("express").Router();
const blogController = require("./controller");

router.post("/create", blogController.addBlog);
router.put("/update", blogController.updateBlog);
router.delete("/delete", blogController.deleteBlog);
router.get("/:id", blogController.getBlogById);
router.get("/list/:limit/:offset", blogController.getAllBlog);

module.exports = router;
