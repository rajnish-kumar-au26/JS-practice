const productTransactionModel = require("../db/productTransation.json");
const { v4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const reqPath = path.join(__dirname, "../db/productTransation.json");
const MESSAGES = require("../messages/index");
const RESPONSES = require("../responses/constantResponses");

class ProductTransaction {
  create = async ({ productId, userId }) => {
    try {
      const productTransactionId = v4();

      if (!productId.length) {
        throw { message: "ProductId required", status: 400 };
      }

      productTransactionModel.push({
        userId,
        productId,
        productTransactionId,
        transactionDate: new Date(),
      });

      fs.writeFile(
        reqPath,
        JSON.stringify(productTransactionModel),
        (error) => {
          if (error) {
            throw error;
          }
        }
      );
      return {
        message: "Product transaction created successfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };

  update = ({ userId, productId }) => {
    try {
      if (!userId.length) {
        throw { message: "Product transaction id required", status: 400 };
      }

      if (!productId.length) {
        throw { message: "ProductId required", status: 400 };
      }

      const isTransactionId = productTransactionModel.findIndex(
        (tran) => tran.userId === userId
      );

      if (isTransactionId === -1) {
        throw { message: "ProductTransaction id not found", status: 400 };
      }

      productTransactionModel[isTransactionId].productId = productId;

      fs.writeFile(
        reqPath,
        JSON.stringify(productTransactionModel),
        (error) => {
          if (error) {
            throw error;
          }
        }
      );

      return {
        message: "product transaction update",
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };

  delete = (userId) => {
    try {
      if (!userId) {
        throw { message: "userId required", status: 400 };
      }

      if (!productTransactionModel.length) {
        throw { message: "No transactiion found db is empty", status: 400 };
      }

      const isTransactionId = productTransactionModel.filter(
        (tran) => tran.userId !== userId
      );

      if (productTransactionModel.length === isTransactionId.length) {
        throw { message: "user doesn't exist", status: 400 };
      }

      fs.writeFile(reqPath, JSON.stringify(isTransactionId), (error) => {
        if (error) {
          throw error;
        }
      });

      return {
        message: "Delete suceessfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };

  getTransactionByid = (userId) => {
    try {
      if (!userId.length) {
        throw { message: "userId required", status: 400 };
      }

      const isTransation = productTransactionModel.filter(
        (tran) => tran.userId == userId
      );

      if (!isTransation.length) {
        throw { message: "Transaction not found", status: 400 };
      }

      return {
        message: "product transactions found",
        status: 200,
        error: false,
        data: isTransation,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };

  getAllTransaction = (limit = 10, offset = 1) => {
    try {
      if (!productTransactionModel.length) {
        throw {
          message: "No product Transaction",
          status: 400,
        };
      }

      const start = limit * (offset - 1);
      const last = limit * offset;

      const transactionData = productTransactionModel.slice(start, last);
      return {
        message: "Transaction found successfully",
        status: 200,
        error: false,
        data: {
          rows: transactionData,
          count: productTransactionModel.length,
        },
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: error.error,
      };
    }
  };
}

module.exports = new ProductTransaction();
