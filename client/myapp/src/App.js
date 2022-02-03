import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
// import Counter from "./components/counter";

import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="/register" element={<Register loggedIn={loggedIn} />} />
        <Route path="/" element={<Home loggedIn={loggedIn} />} />
      </Routes>
    </Router>
  );
};

export default App;
