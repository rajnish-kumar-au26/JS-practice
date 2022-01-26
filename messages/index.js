module.exports = {
  BLOG: {
    TITLE_VALIDATION: "Title should be atleast 5 character",
    DESCRIPTION_VALIDATION: "Description should be atleast 10 character long",
    IMAGE_VALIDATION: "Please upload a valid photo",
    ERROR: "Blog not found",
    SUCCESS: "Blog found successfully",
    ADD_BLOG: {
      TITLE_EXIST: "Title already exist",
      SUCCESS: "Blog added successfully",
    },
    UPDATE_BLOG: {
      ERROR: "Data required to update blog",
      NOT_FOUND: "Please enter a valid blog id",
      SUCCESS: "blog update successfully",
    },
    DELETE_BLOG: {
      ERROR: "No data found",
      NOT_FOUND: "Blog not found for given id",
      SUCCESS: "Blog deleted successfully",
    },
  },

  USERS: {
    NAME_VALIDATION: "Name must be more than 5 char",
    EMAIL_VALIDATION: "You have entered an invalid email address!",
    PASSWORD_VALIDATION: "Password validation error",
    USER_EXIST: "Email already exist",
    ERROR: "User is not found",
    SUCCESS: "User found successfully",
    REGISTER: {
      SUCCESS: "User added successfully",
    },
    GET_USER_BY_EMAIL: {
      SUCCESS: "User found successfully",
    },
    LOGIN: {
      SUCCESS: "User successfully logged in",
    },
    UPDATE_USER: {
      SUCCESS: "User updated successfully",
    },
  },
  JWT_VALIDATION: {
    GENERATE_TOKEN: {
      ERROR: "Invalid user id",
      SUCCESS: "Token generated successfully",
    },
    VERIFIED_TOKEN: {
      INVALID_TOKEN: "Failed to verify Token",
    },
  },
};
