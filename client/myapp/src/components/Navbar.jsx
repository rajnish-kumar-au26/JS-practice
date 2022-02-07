import { Link } from 'react-router-dom';

export const Navbar = ({ loggedIn }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          Home
        </Link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <Link class="nav-item nav-link" to="/product-list">
              Products
            </Link>
          </ul>
          <ul class="navbar-nav">
            <Link class="nav-item nav-link" to="/product">
              Blogs
            </Link>
          </ul>
          <ul class="navbar-nav">
            <Link class="nav-item nav-link" to="/product">
              Transactions
            </Link>
          </ul>
          <ul class="navbar-nav">
            <Link class="nav-item nav-link" to="/wallet-balance">
              Wallet
            </Link>
          </ul>
          <ul class="navbar-nav">
            <Link class="nav-item nav-link" to="/product-add">
              Add-Products
            </Link>
          </ul>
          <ul class="navbar-nav">
            <Link class="nav-item nav-link" to="/products-card">
              Products-Card
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
