import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import { Product } from './components/product';
import { Navbar } from './components/Navbar';
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
        <Route path="/product" element={<Product token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;
