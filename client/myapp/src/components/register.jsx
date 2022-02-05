import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Register({ loggedIn }) {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [isRegister, SetRegister] = useState(false);

  const loginHandler = async () => {
    const apiurl = "http://localhost:4000/user/register";
    const apiRes = await axios
      .post(apiurl, user)
      .then((res) => res)
      .catch((error) => error.response);

    setMessage(apiRes.data.message);

    if (!apiRes.data.error) {
      SetRegister(true);
    }

    // setMessage(apiRes.data.message);
  };

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  if (isRegister) {
    return <Navigate to="/login" />;
  }
  function handleSubmit(event) {
    event.preventDefault();
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
                      Create an Account
                    </h5>
                    <p class="text-center small">
                      Enter your personal details to create account
                    </p>
                  </div>

                  <form
                    class="row g-3 needs-validation"
                    onSubmit={handleSubmit}
                  >
                    <div class="col-12">
                      <label for="yourName" class="form-label">
                        Your Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="yourName"
                        required
                        onChange={(e) => inputHandler(e)}
                        name="name"
                        placeholder="Enter Name"
                      />
                      <div class="invalid-feedback">
                        Please, enter your name!
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourEmail" class="form-label">
                        Your Email
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="yourEmail"
                        required
                        onChange={(e) => inputHandler(e)}
                        name="email"
                        placeholder="Enter email"
                      />
                      <div class="invalid-feedback">
                        Please enter a valid Email adddress!
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
                      >
                        Create Account
                      </button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">
                        Already have an account? <a href="/login">Log in</a>
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

export default Register;
