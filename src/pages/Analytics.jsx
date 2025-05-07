import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import './Analytics.css';

function ProductAnalytics() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/prices/');
        const data = await response.json();
        setPrices(data);
      } catch (err) {
        console.error('Failed to fetch prices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">📈 Product Price Insights</h2>

      {loading ? (
        <p>Loading price data...</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={prices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="crop_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="market_price" name="Price (₹)" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>

          <h3 style={{ marginTop: '2rem' }}>Bar Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="crop_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="market_price" name="Price (₹)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default ProductAnalytics;
