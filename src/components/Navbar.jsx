import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>AgriBridge</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/market-price">Market Prices</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/logistics">Logistics</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/payment">Payments</Link>
        <Link to="/login">Login</Link>
        <Link to="/add-crop">AddProducts</Link>

      </div>
    </nav>
  );
}

export default Navbar;
