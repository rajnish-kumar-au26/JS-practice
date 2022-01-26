const blogs = require("../db/blogs.json");
const { v4 } = require("uuid");
const fs = require("fs");
const path = require("path");
let reqPath = path.join(__dirname, "../db/blogs.json");
const MESSAGES = require("../messages/index");

class BlogService {
  addBlog = ({ title, description, photo }) => {
    try {
      // title validaton`
      if (title.length < 5) {
        throw {
          message: MESSAGES.BLOG.ADD_BLOG.TITLE_VALIDATION,
          status: 400,
          error: true,
        };
      }

      // description validation
      if (description.length < 10) {
        throw {
          message: MESSAGES.BLOG.ADD_BLOG.DESCRIPTION_VALIDATION,
          status: 400,
          error: true,
        };
      }

      // phtot validation
      if (photo.length < 0) {
        throw { message: "invalid photo", status: 400 };
      }

      // cheack title
      const isTitle = blogs.filter((user) => user.title == title);
      if (isTitle.length) {
        throw { message: "title already exist", status: 400 };
      }

      const updatedBlog = blogs;
      updatedBlog.push({
        title: title,
        description: description,
        feturedImage: photo,
        blogId: v4(),
      });

      fs.writeFile(reqPath, JSON.stringify(updatedBlog), (error) => {
        if (error) throw error;
      });

      return {
        message: "Blog added successfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status,
        errpr: true,
      };
    }
  };

  updateBlog = (blogId, newData) => {
    try {
      // check all fields data
      if (!newData.description && !newData.title && !newData.photo) {
        throw { message: "Data required to update blog", status: 400 };
      }

      // check description and description length
      if (newData.description && newData.description.length < 10) {
        throw {
          message: "description should be atleast 10 character long",
          status: 400,
        };
      }

      // check title and title length
      if (newData.title && newData.title.length < 5) {
        throw {
          message: "title should be atleast 5 character long",
          status: 400,
        };
      }

      //find user id
      const isBlogId = blogs.findIndex((user) => user.blogId == blogId);
      if (isBlogId === -1) {
        throw { message: "blogId invalid", status: 400 };
      }

      const updateData = blogs;
      updateData[isBlogId].title = newData.title;
      updateData[isBlogId].description = newData.description;
      updateData[isBlogId].feturedImage = newData.photo;

      fs.writeFile(reqPath, JSON.stringify(updateData), (error) => {
        if (error) throw error;
      });

      return {
        message: "blog update successfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status,
        error: true,
      };
    }
  };

  deleteBlog = (blogId) => {
    try {
      if (!blogs.length) {
        throw { message: "No data found", status: 400 };
      }

      const newData = blogs.filter((data) => data.blogId !== blogId);

      if (blogs.length === newData.length) {
        throw { message: "Blog not found for given id", status: 400 };
      }

      fs.writeFile(reqPath, JSON.stringify(newData), (error) => {
        if (error) throw error;
      });

      return {
        message: "Blog deleted successfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return { message: error.message, status: error.status, error: true };
    }
  };

  getBlogById = (blogId) => {
    try {
      const isBlogObj = blogs.filter((user) => user.blogId === blogId);
      if (!isBlogObj.length) {
        throw { message: "Blog not found", status: 400 };
      }

      return {
        message: "Blog found successfully",
        status: 200,
        error: false,
        data: isBlogObj[0],
      };
    } catch (error) {
      return { message: error.message, status: error.status, error: true };
    }
  };
  getAllBlog = (limit = 10, offset = 1) => {
    try {
      if (!blogs.length) {
        throw { message: "No blogs found", status: 400 };
      }

      const start = limit * (offset - 1);
      const last = limit * offset;

      const allBlogs = blogs.slice(start, last);

      return {
        message: "Blogs found successfully",
        status: 200,
        error: false,
        data: { rows: allBlogs, count: blogs.length },
      };
    } catch (error) {
      return { message: error.message, status: error.status, error: true };
    }
  };
}

module.exports = new BlogService();
