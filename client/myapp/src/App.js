import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import { ProductList } from './components/productList';
import { Navbar } from './components/Navbar';
import WalletBalance from './components/walletBalance';
import CreateProduct from './components/addProduct';
// import Counter from "./components/counter";

import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(false);

  return (
    <Router>
      <Navbar loggedIn={loggedIn} />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setToken={setToken}
            />
          }
        />
        <Route path="/register" element={<Register loggedIn={loggedIn} />} />
        <Route path="/" element={<Home />} />
        <Route path="/product-list" element={<ProductList token={token} />} />
        <Route path="/product-add" element={<CreateProduct token={token} />} />
        <Route
          path="/wallet-balance"
          element={<WalletBalance token={token} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
