const productService = require("../../services/productService");
const walletService = require("../../services/walletService");
const walletTransaction = require("../../services/walletTransactionService");

class PaymentController {
  buyProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const userId = req.userId;
      const productInfo = await productService.getProduct(productId);
      if (productInfo.error) {
        throw productInfo;
      }

      const productPrice = productInfo.data.price;
      const walletInfo = await walletService.getById({ userId });

      if (walletInfo.error) {
        throw {
          ...walletInfo,
          message: "Failed to purchase the product, Internal error",
        };
      }

      const userBalance = walletInfo.data.amount;

      if (userBalance < parseInt(productPrice)) {
        throw {
          message:
            "You do not have sufficient balance to purchase this product",
          status: 400,
        };
      }
      const amount = userBalance - parseInt(productPrice);
      const updateWalletInfo = await walletService.update({ userId, amount });

      if (updateWalletInfo.error) {
        throw {
          ...updateWalletInfo,
          message: "Failed to purchase the product, Internal error",
        };
      }

      const walletTransactionInfo = await walletTransaction.create({
        status: "COMPLETED",
        walletId: walletInfo.data.walletId,
        transactionAmount: parseInt(productPrice),
      });

      if (walletTransactionInfo.error) {
        throw {
          ...walletTransactionInfo,
          message: "Failed to purchase the product, Internal error",
        };
      }

      return res
        .status(walletTransactionInfo.status)
        .send({ message: "Product purchase successfully", error: false });
    } catch (error) {
      return res.status(error.status ? error.status : 400).send({
        message: error.message,
        error: error.error ? error.error : true,
      });
    }
  };
}

module.exports = new PaymentController();
