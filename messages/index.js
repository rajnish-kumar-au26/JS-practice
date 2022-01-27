module.exports = {
  BLOG: {
    TITLE_VALIDATION: "Title should be atleast 5 character",
    DESCRIPTION_VALIDATION: "Description should be atleast 10 character long",
    IMAGE_VALIDATION: "Please upload a valid photo",
    ERROR: "Blog not found",
    SUCCESS: "Blog found successfully",
    ADD_BLOG: {
      TITLE_VALIDATION: "Title should be atleast 5 character",
      DESCRIPTION_VALIDATION: "Description should be atleast 10 character long",
    },
  },
  PRODUCTS: {
    ADD_PRODUCT: {
      NAME_VALIDATION: "Name must be required",
      DESCRIPTION_VALIDATION: "Description must be required",
      PRICE_VALIDATION: "Price must be required",
      IMAGE_VALIDATION: "Image must be required",
      IS_REGISTER: "Title name is already exists",
      SUCCESS: "Product added successfully",
    },
    UPDATE_PRODUCT: {
      ID_VALIDATION: "ProductID must be required",
      PRODUCT_ID_VALIDATION:
        "Product Id is invalid/worng please provide correct id",
      SUCCESS: "Product Updated successfully",
    },
    DELETE_PRODUCT: {
      ID_VALIDATION: "Product Id is invalid/worng please provide correct id",
      SUCCESS: "Product Deleted successfully",
    },
    GET_PRODUCT: {
      ID_VALIDATION: "Invalid Id Please Provide vailid Id required",
      SUCCESS: "Product GET successfully",
    },
    GET_ALL_PRODUCT: {},
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
      ERROR: "email and password required",
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
