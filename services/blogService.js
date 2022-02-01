const blogs = require("../db/blogs.json");
const { v4 } = require("uuid");
const fs = require("fs");
const path = require("path");
let reqPath = path.join(__dirname, "../db/blogs.json");
const MESSAGES = require("../messages/index");
const RESPONSES = require("../responses/constantResponses");

class BlogService {
  addBlog = ({ userId, title, description, photo }) => {
    try {
      // title validaton`
      if (title.length < 5) {
        throw {
          message: MESSAGES.BLOG.TITLE_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }

      // description validation
      if (description.length < 10) {
        throw {
          message: MESSAGES.BLOG.DESCRIPTION_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }

      // phtot validation
      if (!photo || photo.length < 5) {
        throw {
          message: MESSAGES.BLOG.IMAGE_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      // cheack title
      const isTitle = blogs.filter((user) => user.title == title);
      if (isTitle.length) {
        throw {
          message: MESSAGES.BLOG.ADD_BLOG.TITLE_EXIST,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      const updatedBlog = blogs;
      updatedBlog.push({
        userId: userId,
        title: title,
        description: description,
        feturedImage: photo,
        blogId: v4(),
        date: new Date(),
      });

      fs.writeFile(reqPath, JSON.stringify(updatedBlog), (error) => {
        if (error) throw error;
      });

      return {
        message: MESSAGES.BLOG.ADD_BLOG.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        error: true,
      };
    }
  };

  updateBlog = (newData) => {
    try {
      // check all fields data
      if (
        !newData.description &&
        !newData.title &&
        !newData.photo &&
        !newData.userId
      ) {
        throw {
          message: MESSAGES.BLOG.UPDATE_BLOG.ERROR,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      // check description and description length
      if (newData.description && newData.description.length < 10) {
        throw {
          message: MESSAGES.BLOG.DESCRIPTION_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      // check title and title length
      if (newData.title && newData.title.length < 5) {
        throw {
          message: MESSAGES.BLOG.TITLE_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      //find user id
      const isBlogId = blogs.findIndex((user) => user.userId == newData.userId);
      if (isBlogId === -1) {
        throw {
          message: MESSAGES.BLOG.UPDATE_BLOG.NOT_FOUND,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      const updateData = blogs;
      updateData[isBlogId].title = newData.title;
      updateData[isBlogId].description = newData.description;
      updateData[isBlogId].feturedImage = newData.photo;
      updateData[isBlogId].userId = newData.userId;

      fs.writeFile(reqPath, JSON.stringify(updateData), (error) => {
        if (error) throw error;
      });

      return {
        message: MESSAGES.BLOG.UPDATE_BLOG.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        error: true,
      };
    }
  };

  deleteBlog = (blogId) => {
    try {
      if (!blogs.length) {
        throw {
          message: MESSAGES.BLOG.DELETE_BLOG.ERROR,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      const newData = blogs.filter((data) => data.blogId !== blogId);

      if (blogs.length === newData.length) {
        throw {
          message: MESSAGES.BLOG.DELETE_BLOG.NOT_FOUND,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      fs.writeFile(reqPath, JSON.stringify(newData), (error) => {
        if (error) throw error;
      });

      return {
        message: MESSAGES.BLOG.DELETE_BLOG.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        error: true,
      };
    }
  };

  getBlogByUserId = (userId) => {
    try {
      if (!userId) {
        throw { message: "Enter a valid userid", status: 400 };
      }

      const isBlogObj = blogs.filter((user) => user.userId === userId);
      if (!isBlogObj.length) {
        throw { message: MESSAGES.BLOG.ERROR, status: RESPONSES.BAD_REQUEST };
      }

      return {
        message: MESSAGES.BLOG.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
        data: isBlogObj[0],
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        error: true,
      };
    }
  };
  getAllBlog = (limit = 10, offset = 1) => {
    try {
      if (!blogs.length) {
        throw { message: MESSAGES.BLOG.ERROR, status: RESPONSES.BAD_REQUEST };
      }

      const start = limit * (offset - 1);
      const last = limit * offset;

      const allBlogs = blogs.slice(start, last);

      return {
        message: MESSAGES.BLOG.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
        data: { rows: allBlogs, count: blogs.length },
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        error: true,
      };
    }
  };
}

module.exports = new BlogService();
