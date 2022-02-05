import { Link } from 'react-router-dom';

export const Navbar = ({ loggedIn }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          Navbar
        </Link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <Link class="nav-item" to="/product">
              Products
            </Link>
          </ul>
        </div>
        <form class="d-flex">
          <button class="btn btn-outline-success" type="submit">
            {loggedIn ? 'Logout' : <Link to="/login">Login</Link>}
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
