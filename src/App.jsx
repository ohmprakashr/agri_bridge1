import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MarketPrice from './pages/MarketPrice';
import ProductListing from './pages/ProductListing';
import Orders from './pages/Orders';
import Logistics from './pages/Logistics';
import Payment from './pages/Payment';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';
import ForgotPassword from "./pages/ForgotPassword";
import AddCropPrice from './pages/AddCropPrice';
//import Login from './Login';
//import Signup from './Signup';
//import AddProduct from './AddProduct'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-product" element={<AddProduct />} /> */}
         <Route path="/add-product" element={<AddCropPrice />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/market-price" element={<MarketPrice />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/add-crop" element={<AddCropPrice />} />
      </Routes>
    </Router>
  );
}

export default App;
