const userService = require("../../services/userService");
const walletService = require("../../services/walletService");
const walletTransactionService = require("../../services/walletTransactionService");

class WalletController {
  depositService = (req, res) => {
    try {
      const { amount } = req.body;
      const userId = req.userId;
      const userWallet = walletService.getById(userId);
      const walletRes = walletService.update({
        userdId: userId,
        amount: userWallet.data.amount + amount,
        currency: "INR",
      });
      if (walletRes.error) {
        throw walletRes;
      }
      const walletTransactionRes = walletTransactionService.create({
        status: "COMPLETED",
        walletId: userWallet.data.walletId,
        transactionAmount: amount,
        transactionType: "DEPOSIT",
      });
      if (walletTransactionRes.error) {
        throw walletTransactionRes;
      }

      return res.status(walletRes.status).send({
        message: walletRes.message,
        error: walletRes.error,
      });
    } catch (error) {
      return res.status(error.status ? error.status : 400).send({
        message: error.message,
        error: error.error ? error.error : true,
      });
    }
  };

  withdrawalService = (req, res) => {
    try {
      const { amount } = req.body;
      const userId = req.userId;
      const userWallet = walletService.getById(userId);
      if (amount > userWallet.data.amount) {
        throw {
          message: "Not enough fund to withdraw",
          error: true,
        };
      }
      const walletRes = walletService.update({
        userdId: userId,
        amount: userWallet.data.amount - amount,
        currency: "INR",
      });
      if (walletRes.error) {
        throw walletRes;
      }
      const walletTransactionRes = walletTransactionService.create({
        status: "COMPLETED",
        walletId: userWallet.data.walletId,
        transactionAmount: amount,
        transactionType: "WITHDRAWAL",
      });
      if (walletTransactionRes.error) {
        throw walletTransactionRes;
      }

      return res.status(walletRes.status).send({
        message: walletRes.message,
        error: walletRes.error,
      });
    } catch (error) {
      return res.status(error.status ? error.status : 400).send({
        message: error.message,
        error: error.error ? error.error : true,
      });
    }
  };
  getWalletByUserId = (req, res) => {
    try {
      const userId = req.userId;
      const walletRes = walletService.getById(userId);
      if (walletRes.error) {
        throw walletRes;
      }
      return res.status(walletRes.status).send({
        message: walletRes.message,
        error: walletRes.error,
        data: walletRes.data,
      });
    } catch (error) {
      return res.status(error.status ? error.status : 400).send({
        message: error.message,
        error: error.error ? error.error : true,
      });
    }
  };
}

module.exports = new WalletController();
