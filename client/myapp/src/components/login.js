import { useState } from "react";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const loginHandler = async () => {
    const apiurl = "http://localhost:4000/user/login";

    const apiRes = await axios
      .post(apiurl, user, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res)
      .catch((error) => error.response);

    setMessage(apiRes.data.message);

    if (!apiRes.data.error) {
      const gotToken = apiRes.data.data.token;
      setToken(gotToken);

      const product = await axios
        .get("http://localhost:4000/product/transaction/list", {
          headers: {
            Authorization: gotToken,
          },
        })
        .then((res) => res)
        .catch((error) => error.response);
      console.log("API res", product.data);
    }
  };

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });

    // if (name === "email") {
    //   const userData = {
    //     email: value,
    //   };
    //   const updatedUser = { ...user, ...userData };
    //   setUser(updatedUser);
    // } else {
    //   const userData = {
    //     password: value,
    //   };
    //   const updatedUser = { ...user, ...userData };
    //   setUser(updatedUser);
    // }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <h4>{message}</h4>
      <p>{token}</p>
      <input
        onChange={(e) => inputHandler(e)}
        name="email"
        placeholder="Enter email"
      />
      <input
        onChange={(e) => inputHandler(e)}
        name="password"
        placeholder="Enter password"
      />
      <button onClick={() => loginHandler()}>Login</button>
    </div>
  );
}

export default Login;
