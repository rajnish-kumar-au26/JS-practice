import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");

  const loginHandler = async () => {
    const apiUri = "http://localhost:4000/user/login";

    const apiRes = await axios
      .post(apiUri, user, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res)
      .catch((error) => error.response);
  };
  setMessage(apiRes.data.message);

  const inputHandler = (props) => {
    const name = props.target.name;
    const value = props.target.value;

    setUser({ ...user, [name]: value });
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <h2>Login Page</h2>
      {/* <h4>{message}</h4> */}
      {/* <p>{token}</p> */}
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
