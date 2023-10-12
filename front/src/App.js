import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import OrderTracking from "./components/OrderTracking";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import MentionsLegales from "./components/MentionsLegales";
import Profile from "./components/Profile"; // Import MentionsLegales component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
