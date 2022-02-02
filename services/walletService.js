const walletModel = require("../db/wallet.json");
const RESPONSES = require("../responses/constantResponses");
const fs = require("fs");
const path = require("path");
const reqPath = path.join(__dirname, "../db/wallet.json");
const { v4 } = require("uuid");
const Message = require("../messages/index");

class WalletService {
  create = async ({ userId, amount, currency }) => {
    try {
      // userId validation
      if (!userId) {
        throw {
          message: Message.WALLET.USER_VALIDATION,
          status: 400,
        };
      }

      const newWallet = walletModel;
      newWallet.push({ userId, amount, currency, walletId: v4() });
      fs.writeFile(reqPath, JSON.stringify(newWallet), (error) => {
        if (error) {
          throw error;
        }
      });
      return {
        status: RESPONSES.SUCCESS,
        message: Message.WALLET.CREATE.SUCCESS,
        error: false,
      };
    } catch (error) {
      return {
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        message: error.message,
        error: true,
      };
    }
  };

  update = async ({ userId, amount, currency }) => {
    try {
      // userId validation
      if (!userId && !amount && !currency) {
        throw {
          message: Message.WALLET.UPDATE.DATA_REQUIRED,
          status: 400,
        };
      }

      const newWallet = walletModel;
      const userWallet = newWallet.findIndex((wall) => wall.userId == userId);

      newWallet[userWallet].amount = amount;
      newWallet[userWallet].currency = currency ? currency : "INR";

      fs.writeFile(reqPath, JSON.stringify(newWallet), (error) => {
        if (error) {
          throw error;
        }
      });
      return {
        status: RESPONSES.SUCCESS,
        message: Message.WALLET.UPDATE.SUCCESS,
        error: false,
      };
    } catch (error) {
      return {
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        message: error.message,
        error: true,
      };
    }
  };

  getById = async (userId) => {
    try {
      // userId Validation
      if (!userId) {
        throw {
          message: Message.WALLET.USER_VALIDATION,
          status: 400,
        };
      }
      if (!walletModel.length) {
        throw { message: "No data found in wallet database" };
      }
      const newWallet = walletModel.filter((wall) => wall.userId === userId);

      if (!newWallet.length) {
        throw { message: "No wallet found for the given id" };
      }
      return {
        status: RESPONSES.SUCCESS,
        message: Message.WALLET.GATE_BY_ID.SUCCESS,
        error: false,
        data: newWallet[0],
      };
    } catch (error) {
      return {
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        message: error.message,
        error: true,
      };
    }
  };

  delete = ({ walletId }) => {
    try {
      // walletId validation
      if (!walletId) {
        throw { message: Message.WALLET.DELETE.WALLET_ID_REQ, status: 400 };
      }
      const newWallet = walletModel.filter(
        (wall) => wall.walletId !== walletId
      );

      fs.writeFile(reqPath, JSON.stringify(newWallet), (error) => {
        if (error) {
          throw error;
        }
      });
      return {
        status: RESPONSES.SUCCESS,
        message: Message.WALLET.DELETE.SUCCESS,
        error: false,
      };
    } catch (error) {
      return {
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        message: error.message,
        error: true,
      };
    }
  };

  getWalletList = ({ limit, offset }) => {
    try {
      const dataLimit = limit * offset;
      const initialData = dataLimit - limit;

      let walletData = walletModel.slice(initialData, dataLimit);
      return {
        status: RESPONSES.SUCCESS,
        message: Message.WALLET.GET_WALLET_LIST.SUCCESS,
        error: false,
        data: {
          row: walletData,
          count: walletModel.length,
        },
      };
    } catch (error) {
      return {
        status: error.status ? error.status : RESPONSES.BAD_REQUEST,
        message: error.message,
        error: true,
      };
    }
  };
}

module.exports = new WalletService();
