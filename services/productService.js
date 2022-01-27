const products = require("../db/products.json");
const { v4 } = require("uuid");
const fs = require("fs");
const path = require("path");
let reqPath = path.join(__dirname, "../db/products.json");
const RESPONSES = require("../responses/constantResponses");

class ProductsService {
  addProduct = async ({ name, description, price, image }) => {
    try {
      //   Name Validation
      if (!name.length) {
        throw {
          message: Messages.PRODUCTS.ADD_PRODUCT.NAME_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }

      //   Description Validation
      if (!description.length) {
        throw {
          message: Messages.PRODUCTS.ADD_PRODUCT.DESCRIPTION_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }

      //   Price Validation
      if (!price.length) {
        throw {
          message: Messages.PRODUCTS.ADD_PRODUCT.PRICE_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }

      //Image Validation
      if (!image.length) {
        throw {
          message: Messages.PRODUCTS.ADD_PRODUCT.IMAGE_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }

      let findProductTitle = products.filter((product) => product.name == name);
      //   console.log(findProductTitle);
      if (findProductTitle.length) {
        throw {
          message: Messages.PRODUCTS.ADD_PRODUCT.IS_REGISTER,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }

      let productDetails = {
        id: v4(),
        name,
        description,
        price,
        image,
        date: new Date(),
      };

      products.push(productDetails);
      fs.writeFile(reqPath, JSON.stringify(products), (error) => {
        if (error) {
          throw error;
        }
      });
      //   console.log(productDetails);
      return {
        message: Messages.PRODUCTS.ADD_PRODUCT.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
        // data: productDetails,
      };
    } catch (error) {
      return { message: error.message, status: error.status, error: true };
    }
  };

  updateProduct = async (productID, newProduct) => {
    try {
      //   productID Validation
      if (!productID.length) {
        throw {
          message: Messages.PRODUCTS.UPDATE_PRODUCT.ID_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }
      let findProductByID = products.filter(
        (product) => product.id == productID
      );
      //   console.log(findProductByID);
      if (!findProductByID.length) {
        throw {
          message: Messages.PRODUCTS.UPDATE_PRODUCT.PRODUCT_ID_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }
      const { name, description, price, image } = newProduct;
      //   console.log(name, description, price, image);
      let productTitleName = findProductByID[0].name;
      let productDescription = findProductByID[0].description;
      let productPrice = findProductByID[0].price;
      let productImage = findProductByID[0].image;
      //   let ceratedDate = findProductByID[0].date;
      //   let modifiedDate = new Date();
      if (name.length) {
        productTitleName = name;
      }
      if (description.length) {
        productDescription = description;
      }
      if (price.length) {
        productPrice = price;
      }
      if (image.length) {
        productImage = image;
      }

      let index = products.findIndex((user) => user.id == productId);
      //   console.log(index);
      products[index].name = productTitleName;
      products[index].description = productDescription;
      products[index].price = productPrice;
      products[index].image = productImage;

      fs.writeFile(reqPath, JSON.stringify(products), (error) => {
        if (error) {
          throw error;
        }
      });
      return {
        message: Messages.PRODUCTS.UPDATE_PRODUCT.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
      };
    } catch (error) {
      return { message: error.message, status: error.status, error: true };
    }
  };

  deleteProduct = async (productID) => {
    try {
      let index = products.findIndex((user) => user.id == productID);
      if (index == -1) {
        throw {
          message: Messages.PRODUCTS.DELETE_PRODUCT.ID_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }
      products.splice(index, 1);
      fs.writeFile(reqPath, JSON.stringify(products), (error) => {
        if (error) {
          throw error;
        }
      });
      return {
        message: Messages.PRODUCTS.DELETE_PRODUCT.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
      };
    } catch (error) {
      return { message: error.message, status: error.status, error: true };
    }
  };

  getProduct = async (productID) => {
    try {
      let getData = products.filter((product) => product.id === productID);
      if (!getData.length) {
        throw {
          message: Messages.PRODUCTS.GET_PRODUCT.ID_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }
      return {
        message: Messages.PRODUCTS.GET_PRODUCT.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
        data: getData[0],
      };
    } catch (error) {
      return { message: error.message, status: error.status, error: true };
    }
  };

  getAllProduct = async (offset = 1, limit = 10) => {
    try {
      if (!products.length) {
        throw {
          message: Messages.PRODUCTS.GET_ALL_PRODUCT.DATA_VALIDATION,
          status: RESPONSES.SUCCESS,
        };
      }
      let end = limit * offset;
      let start = end - limit;
      let data = products.slice(start, end);
      return {
        message: Messages.PRODUCTS.GET_ALL_PRODUCT.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
        data: { count: products.length, rows: data },
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status,
        error: true,
      };
    }
  };
}

module.exports = new ProductsService();
