import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import OrderTracking from "./components/OrderTracking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        {/* Ajoutez d'autres routes ici si nécessaire */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
