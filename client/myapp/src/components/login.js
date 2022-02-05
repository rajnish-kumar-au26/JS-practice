import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Login({ loggedIn, setLoggedIn, setToken }) {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  // const [token, setToken] = useState("");

  const loginHandler = async () => {
    const apiurl = 'http://localhost:4000/user/login';

    const apiRes = await axios
      .post(apiurl, user)
      .then((res) => res)
      .catch((error) => error.response);

    if (!apiRes.data.error) {
      const gotToken = apiRes.data.data.token;
      setMessage(apiRes.data.message);
      setLoggedIn(true);
      setToken(gotToken);

      // const product = await axios
      //   .get('http://localhost:4000/product/transaction/list', {
      //     headers: {
      //       Authorization: gotToken,
      //     },
      //   })
      //   .then((res) => res)
      //   .catch((error) => error.response);
      // console.log('API res', product.data);
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

  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <h2>Login Page</h2>
      <h4>{message}</h4>
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
