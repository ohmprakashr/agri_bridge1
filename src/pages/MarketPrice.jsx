import React, { useState, useEffect } from 'react';
import './MarketPrice.css';

function MarketPrice() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [updatedItems, setUpdatedItems] = useState({});

  useEffect(() => {
    const fetchAndUpdatePrices = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/prices/');
        const priceData = await response.json();

        const localProducts = JSON.parse(localStorage.getItem('products')) || [];
        const oldProducts = [...localProducts];

        const updated = {};
        const newProducts = localProducts.map((product) => {
          const match = priceData.find(
            (price) =>
              price.crop_name.toLowerCase().trim() === product.crop_name.toLowerCase().trim()
          );

          if (match) {
            const oldPrice = product.market_price;
            const newPrice = match.market_price;
            if (oldPrice && newPrice !== oldPrice) {
              updated[product.crop_name] = newPrice > oldPrice ? 'up' : 'down';
            }
            return { ...product, market_price: newPrice };
          }

          return product;
        });

        localStorage.setItem('products', JSON.stringify(newProducts));
        setProducts(newProducts);
        setUpdatedItems(updated);
        setLastUpdated(new Date().toLocaleString());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prices:', error);
        setLoading(false);
      }
    };

    fetchAndUpdatePrices();
  }, []);

  return (
    <div className="market-price-container">
      <h2 className="market-title">🌾 Real-Time Agricultural Prices</h2>
      <p className="market-subtitle">Latest updates from local markets</p>
      {lastUpdated && <p className="updated-time">🕒 Last updated: {lastUpdated}</p>}

      {loading ? (
        <p>Loading prices...</p>
      ) : products.length === 0 ? (
        <p>No products found in local storage.</p>
      ) : (
        <ul className="market-list">
          {products.map((product, index) => {
            const trend = updatedItems[product.crop_name];
            const className =
              trend === 'up'
                ? 'market-item price-up'
                : trend === 'down'
                ? 'market-item price-down'
                : 'market-item';

            return (
              <li key={index} className={className}>
                <strong>{product.crop_name}</strong> – ₹
                {product.market_price ? product.market_price : 'N/A'}/quintal
                {trend === 'up' && <span className="price-trend"> 🔼</span>}
                {trend === 'down' && <span className="price-trend"> 🔽</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MarketPrice;
