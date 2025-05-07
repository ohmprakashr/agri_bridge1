import React, { useState, useEffect } from 'react';
import './ProductListing.css';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/prices/`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x300?text=No+Image';
    return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
  };

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setError('');
    setQuantity('');
  };

  const handlePlaceOrder = () => {
    const qty = parseFloat(quantity);

    if (isNaN(qty) || qty < 10 || qty > 100) {
      setError('Please enter a quantity between 10 and 100 kg.');
      return;
    }

    const order = {
      ...selectedProduct,
      quantity: qty,
      totalPrice: (qty * selectedProduct.market_price) / 100,
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    setShowModal(false);
    setQuantity('');
    alert('✅ Order placed successfully!');
  };

  return (
    <div className="product-listing-container">
      <h2 className="product-listing-title">🌾 Available Agricultural Products</h2>
      <p className="product-listing-subtitle">Select your quantity and order easily.</p>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={getImageUrl(product.image_file)} 
              alt={product.crop_name} 
              className="product-image" 
            />
            <div className="product-details">
              <h3>{product.crop_name}</h3>
              <p><strong>Location:</strong> {product.location}</p>
              <p><strong>Harvest Date:</strong> {product.harvest_date}</p>
              <p className="product-price">₹{product.market_price}/quintal</p>
              <button className="buy-button" onClick={() => handleBuyClick(product)}>Buy Now</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Order: {selectedProduct.crop_name}</h3>
            <label>
              Quantity (kg) <small>(Min: 10kg, Max: 100kg)</small>:
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                min="10"
                max="100"
                required 
              />
            </label>
            {error && <p className="error">{error}</p>}
            <p><strong>Total Amount:</strong> ₹{quantity ? ((quantity * selectedProduct.market_price) / 100).toFixed(2) : '0.00'}</p>
            <button className="modal-button" onClick={handlePlaceOrder}>✅ Confirm Order</button>
            <button className="modal-button cancel" onClick={() => setShowModal(false)}>❌ Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductListing;
