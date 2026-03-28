import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;