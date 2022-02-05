import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
// import "./styles.css";

function Login({ loggedIn, setLoggedIn, setToken }) {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  // const [token, setToken] = useState("");

  const loginHandler = async () => {
    const apiurl = "http://localhost:4000/user/login";

    const apiRes = await axios
      .post(apiurl, user)
      .then((res) => res)
      .catch((error) => error.response);

    if (!apiRes.data.error) {
      const gotToken = apiRes.data.data.token;
      setMessage(apiRes.data.message);
      setLoggedIn(true);
      setToken(gotToken);
    }
    setMessage(apiRes.data.message);
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
  function handleSubmit(event) {
    event.preventDefault();
  }

  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div class="container">
      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div class="d-flex justify-content-center py-4">
                <span class="d-none d-lg-block logo d-flex align-items-center w-auto">
                  {message}
                </span>
              </div>

              <div class="card mb-3">
                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p class="text-center small">
                      Enter your email & password to login
                    </p>
                  </div>

                  <form
                    class="row g-3 needs-validation"
                    onSubmit={handleSubmit}
                  >
                    <div class="col-12">
                      <label for="yourUsername" class="form-label">
                        Email
                      </label>
                      <div class="input-group has-validation">
                        <input
                          type="email"
                          class="form-control"
                          id="yourUsername"
                          required
                          type="email"
                          class="form-control"
                          onChange={(e) => inputHandler(e)}
                          name="email"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="yourPassword"
                        required
                        type="password"
                        class="form-control"
                        onChange={(e) => inputHandler(e)}
                        name="password"
                        placeholder="Enter password"
                      />
                      <div class="invalid-feedback">
                        Please enter your password!
                      </div>
                    </div>

                    <div class="col-12">
                      <button
                        onClick={() => loginHandler()}
                        class="btn btn-primary w-100"
                        type="submit"
                        class="btn btn-primary w-100"
                      >
                        Login
                      </button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">
                        Don't have account?{" "}
                        <a href="/register">Create an account</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
