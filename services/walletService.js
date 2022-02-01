const walletModel = require("../db/wallet.json");
const RESPONSES = require("../responses/constantResponses");
const fs = require("fs");
const path = require("path");
const reqPath = path.join(__dirname, "../db/wallet.json");
const { v4 } = require("uuid");

class WalletService {
  create = ({ userdId, amount, currency }) => {
    try {
      const newWallet = walletModel;
      newWallet.push({ userdId, amount, currency, walletId: v4() });
      fs.writeFile(reqPath, JSON.stringify(newWallet), (error) => {
        if (error) {
          throw error;
        }
      });
      return {
        status: RESPONSES.SUCCESS,
        message: "Wallet created successfully",
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

  update = ({ userdId, amount, currency }) => {
    try {
      const newWallet = walletModel;
      const userWallet = newWallet.findIndex((wall) => wall.userdId == userdId);

      newWallet[userWallet].amount = amount;
      newWallet[userWallet].currency = currency;

      fs.writeFile(reqPath, JSON.stringify(newWallet), (error) => {
        if (error) {
          throw error;
        }
      });
      return {
        status: RESPONSES.SUCCESS,
        message: "Wallet created successfully",
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

  getById = ({ userdId }) => {
    try {
      const newWallet = walletModel.filter((wall) => wall.userdId === userdId);
      return {
        status: RESPONSES.SUCCESS,
        message: "Wallet created successfully",
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
        message: "Wallet created successfully",
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
        message: "Wallet created successfully",
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

// const walletIns = new WalletService();

let response;

//  response = walletIns.create({
//   userdId: "jhdgtd",
//   amount: 7,
//   currency: "INR",
// });
// console.log("Create ====>", response);

// response = walletIns.update({
//   userdId: "jhdgtd",
//   amount: 67767,
//   currency: "USD",
// });
// console.log("Update ====>", response);

// response = walletIns.getById({
//   userdId: "jhdgtd",
// });
// console.log("GetById ====>", response);

// response = walletIns.getWalletList({
//   limit: 10,
//   offset: 1,
// });
// console.log("GEt Wallet List ====>", response);

// response = walletIns.delete({
//   userdId: "jhdgtd",
// });
// console.log("Delete ====>", response);
