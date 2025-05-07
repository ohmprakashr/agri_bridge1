import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const updateOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  const increaseQuantity = (index) => {
    const updated = [...orders];
    const max = updated[index].available_quantity || 100;
    if (updated[index].quantity < max) {
      updated[index].quantity += 1;
      updated[index].totalPrice = (updated[index].quantity * updated[index].market_price) / 100;
      updateOrders(updated);
    }
  };

  const decreaseQuantity = (index) => {
    const updated = [...orders];
    if (updated[index].quantity > 10) {
      updated[index].quantity -= 1;
      updated[index].totalPrice = (updated[index].quantity * updated[index].market_price) / 100;
      updateOrders(updated);
    }
  };

  const deleteOrder = (index) => {
    const updated = orders.filter((_, i) => i !== index);
    updateOrders(updated);
  };

  const handlePayNow = () => {
    navigate('/payment');
  };

  const totalQuantity = orders.reduce((sum, o) => sum + o.quantity, 0);
  const totalAmount = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="orders-container">
      <h2>🧾 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders placed yet.</p>
      ) : (
        <>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Location</th>
                <th>Quantity (kg)</th>
                <th>Total (₹)</th>
                <th>Order Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.crop_name}</td>
                  <td>{order.location}</td>
                  <td>
                    <button onClick={() => decreaseQuantity(index)} disabled={order.quantity <= 10}>-</button>
                    {` ${order.quantity} `}
                    <button onClick={() => increaseQuantity(index)} disabled={order.quantity >= (order.available_quantity || 100)}>+</button>
                  </td>
                  <td>₹{order.totalPrice.toFixed(2)}</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td><button onClick={() => deleteOrder(index)}>❌</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="summary">
            <p><strong>Total Quantity:</strong> {totalQuantity} kg</p>
            <p><strong>Number of Items:</strong> {orders.length}</p>
            <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
            <button className="pay-now-button" onClick={handlePayNow}>💳 Pay Now</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;
