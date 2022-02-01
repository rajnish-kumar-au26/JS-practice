const walletTransactionModel = require("../db/walletTransaction.json");
const { v4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const reqPath = path.join(__dirname, "../db/walletTransaction.json");
const MESSAGES = require("../messages/index");
const RESPONSES = require("../responses/constantResponses");

class walletTransaction {
  create = ({ status, walletId, transactionAmount }) => {
    try {
      const walletTransactionId = v4();
      if (!walletId.length) {
        throw {
          message: MESSAGES.WALLET_TRANSACTION.WALLET_ID_VALIDATION,
          status: RESPONSES.BAD_REQUEST,
        };
      }

      if (!transactionAmount) {
        throw {
          message: MESSAGES.WALLET_TRANSACTION.TRANSACTION_AMOUNT,
          status: RESPONSES.BAD_REQUEST,
        };
      }
      if (!status.length) {
        throw {
          message: MESSAGES.WALLET_TRANSACTION.STATUS,
          status: RESPONSES.BAD_REQUEST,
        };
      }
      walletTransactionModel.push({
        walletTransactionId,
        walletId,
        status,
        transactionAmount,
        transactionDate: new Date(),
      });
      fs.writeFile(reqPath, JSON.stringify(walletTransactionModel), (error) => {
        if (error) {
          throw error;
        }
      });
      return {
        message: MESSAGES.WALLET_TRANSACTION.SUCCESS,
        status: RESPONSES.CREATED,
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
  update = ({ status, walletTransactionId, transactionAmount }) => {
    try {
      //   if (!walletId.length) {
      //     throw {
      //       message: MESSAGES.WALLET_TRANSACTION.WALLET_ID_VALIDATION,
      //       status: RESPONSES.BAD_REQUEST,
      //     };
      //   }

      if (!transactionAmount) {
        throw {
          message: MESSAGES.WALLET_TRANSACTION.TRANSACTION_AMOUNT,
          status: RESPONSES.BAD_REQUEST,
        };
      }
      if (!status.length) {
        throw {
          message: MESSAGES.WALLET_TRANSACTION.STATUS,
          status: RESPONSES.BAD_REQUEST,
        };
      }
      const isTransation = walletTransactionModel.findIndex(
        (trans) => trans.walletTransactionId === walletTransactionId
      );
      if (isTransation === -1) {
        throw {
          message: MESSAGES.WALLET_TRANSACTION.ERROR,
          status: RESPONSES.BAD_REQUEST,
          error: true,
        };
      }
      (walletTransactionModel[isTransation].status = status),
        (walletTransactionModel[isTransation].transactionAmount =
          transactionAmount),
        (walletTransactionModel[isTransation].transactionDate = new Date());

      fs.writeFile(reqPath, JSON.stringify(walletTransactionModel), (error) => {
        if (error) {
          throw error;
        }
      });
      return {
        message: MESSAGES.WALLET_TRANSACTION.SUCCESS,
        status: RESPONSES.CREATED,
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

  delete = (id) => {
    try {
      const walletTransaction = walletTransactionModel;
      if (!walletTransaction.length) {
        throw { message: "No user found" };
      }
      const newTransactions = walletTransaction.filter(
        (trans) => trans.walletTransactionId !== id
      );

      if (walletTransaction.length === newTransactions.length) {
        throw { message: "User doesn't exist", status: 400, error: true };
      }

      fs.writeFile(reqPath, JSON.stringify(newTransactions), (error) => {
        if (error) throw error;
      });
      return {
        message: MESSAGES.WALLET_TRANSACTION.DELETE_TRANSACTION.SUCCESS,
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

  getAllTransaction = (limit = 10, offset = 1) => {
    try {
      const walletTransaction = walletTransactionModel;
      if (!walletTransaction.length) {
        throw {
          message: MESSAGES.USERS.USER_EXIST,
          error: true,
          status: RESPONSES.BAD_REQUEST,
        };
      }
      const dataLimit = limit * offset;
      const initialData = dataLimit - limit;
      let transactionData = walletTransaction.slice(initialData, dataLimit);
      return {
        message: MESSAGES.WALLET_TRANSACTION.SUCCESS,
        status: RESPONSES.SUCCESS,
        count: walletTransaction.length,
        error: false,
        data: transactionData,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        error: error.error,
      };
    }
  };
  getTransactionById = (transactionId) => {
    try {
      const walletTransaction = walletTransactionModel;
      let getTransaction = walletTransaction.filter(
        (trans) => trans.walletTransactionId === transactionId
      );
      if (!getTransaction.length) {
        throw {
          status: RESPONSES.BAD_REQUEST,
          message: MESSAGES.WALLET_TRANSACTION.WALLET_ID_VALIDATION,
        };
      }
      return {
        message: MESSAGES.WALLET_TRANSACTION.GET_TRANSACTION_BY_ID.SUCCESS,
        status: RESPONSES.SUCCESS,
        error: false,
        data: getTransaction[0],
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

// const walletTrans = new walletTransaction();

// const t1 = walletTrans.create({
//   status: "PENDING",
//   transactionAmount: 100,
//   transactionDate: "10 / 12",
//   walletId: "yuiarjkabdhkag",
// });

// const t2 = walletTrans.update({
//   status: "Approved",
//   walletTransactionId: "57737fa2-621f-4399-857c-2e0f5aa3e73f",
//   transactionAmount: 1000,
// });

// const t3 = walletTrans.delete("01b56d08-60d9-4dfe-b0b6-0318475f1f83");

// const t4 = walletTrans.getTransactionById(
//   "57737fa2-621f-4399-857c-2e0f5aa3e73f"
// );

// console.log(t4);
