import { Link } from "react-router-dom";

const Home = ({ loggedIn }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li>
          </ul>
        </div>
        <form class="d-flex">
          <button class="btn btn-outline-success" type="submit">
            {loggedIn ? "Logout" : <Link to="/login">Login</Link>}
          </button>
          {!loggedIn && (
            <button class="btn btn-outline-success" type="submit">
              <Link to="/register">Register</Link>
            </button>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Home;
