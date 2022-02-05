import { useState, useEffect } from "react";
import axios from "axios";
const WalletBalance = ({ token }) => {
  const [wallet, setWallet] = useState({ amount: 0, currency: "INR" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      fetchTransaction();
    }
  }, [setWallet]);

  const fetchTransaction = async () => {
    const uri = "http://localhost:4000/wallet";
    const walletById = await axios
      .get(uri, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res)
      .catch((error) => error.response);
    if (!walletById?.data?.error) {
      setWallet(walletById.data.data);
      setMessage(walletById.data.message);
    }
  };

  return (
    <div class="card-body main" id="main">
      <h5 class="card-title">
        Wallet <span>| balance</span>
      </h5>

      <div class="d-flex align-items-center">
        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center"></div>
        <div class="ps-3">
          <h3>
            {wallet.currency + " "}
            {wallet.amount}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
