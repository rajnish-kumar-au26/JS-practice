const blogService = require("../../services/blogService");

class BlogController {
  addBlog = (req, res) => {
    try {
      const { description, title, photo } = req.body;
      const blogRes = blogService.addBlog({
        title: title,
        description: description,
        photo: photo,
      });

      if (blogRes.error) {
        throw blogRes;
      }

      return res.status(blogRes.status).send({
        message: blogRes.message,
        error: blogRes.error,
      });
    } catch (error) {
      return res.status(error.status).send({
        message: error.message,
        error: error.error,
      });
    }
  };
  updateBlog = (req, res) => {
    try {
      const blogRes = blogService.updateBlog(
        req.body.blogId ? req.body.blogId : "",
        req.body
      );
      if (blogRes.error) {
        throw blogRes;
      }

      return res.status(blogRes.status).send({
        message: blogRes.message,
        error: blogRes.error,
      });
    } catch (error) {
      return res.status(error.status).send({
        message: error.message,
        error: error.error ? error.error : true,
      });
    }
  };
  deleteBlog = (req, res) => {
    try {
      const blogRes = blogService.deleteBlog(
        req.body.blogId ? req.body.blogId : "",
        req.body
      );

      if (blogRes.error) {
        throw blogRes;
      }

      return res.status(blogRes.status).send({
        message: blogRes.message,
        error: blogRes.error,
      });
    } catch (error) {
      return res.status(error.status).send({
        message: error.message,
        error: error.error ? error.error : true,
      });
    }
  };
  getBlogById = (req, res) => {
    try {
      const id = req.params.id;
      const blogRes = blogService.getBlogById(id);

      return res.status(blogRes.status).send({
        message: blogRes.message,
        error: blogRes.error,
        data: blogRes.data,
      });
    } catch (error) {
      return res.status(error.status).send({
        message: error.message,
        error: error.error ? error.error : true,
      });
    }
  };

  getAllBlog = (req, res) => {
    try {
      let limit = parseInt(req.params.limit);
      let offset = parseInt(req.params.offset);
      const blogRes = blogService.getAllBlog(limit, offset);

      return res.status(blogRes.status).send({
        message: blogRes.message,
        error: blogRes.error,
        data: blogRes.data,
      });
    } catch (error) {
      return res.status(error.status).send({
        message: error.message,
        error: error.error ? error.error : true,
      });
    }
  };
}

module.exports = new BlogController();
