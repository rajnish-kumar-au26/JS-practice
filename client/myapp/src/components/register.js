import { useState } from "react";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");

  const loginHandler = async () => {
    const apiurl = "http://localhost:4000/user/register";
    const apiRes = await axios
      .post(apiurl, user)
      .then((res) => res)
      .catch((error) => error.response);

    setMessage(apiRes.data.message);

    // setMessage(apiRes.data.message);
  };

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <h2>Register Page</h2>
      <h4>{message}</h4>
      <input
        onChange={(e) => inputHandler(e)}
        name="name"
        placeholder="Enter Name"
      />
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

export default Register;
