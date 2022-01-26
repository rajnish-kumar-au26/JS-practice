module.exports = {
  BLOG: {
    ADD_BLOG: {
      TITLE_VALIDATION: 'Title should be atleast 5 character',
      DESCRIPTION_VALIDATION: 'Description should be atleast 10 character long',
    },
  },
  PRODUCTS: {
    ADD_PRODUCT: {
      NAME_VALIDATION: 'Name must be required',
      DESCRIPTION_VALIDATION: 'Description must be required',
      PRICE_VALIDATION: 'Price must be required',
      IMAGE_VALIDATION: 'Image must be required',
      IS_REGISTER: 'Title name is already exists',
      SUCCESS: 'Product added successfully',
    },
    UPDATE_PRODUCT: {
      ID_VALIDATION: 'ProductID must be required',
      PRODUCT_ID_VALIDATION:
        'Product Id is invalid/worng please provide correct id',
      SUCCESS: 'Product Updated successfully',
    },
    DELETE_PRODUCT: {
      ID_VALIDATION: 'Product Id is invalid/worng please provide correct id',
      SUCCESS: 'Product Deleted successfully',
    },
    GET_PRODUCT: {
      ID_VALIDATION: 'Invalid Id Please Provide vailid Id required',
      SUCCESS: 'Product GET successfully',
    },
    GET_ALL_PRODUCT: {},
  },
  USERS: {},
};
