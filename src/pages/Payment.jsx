import React, { useState } from 'react';
import './payment.css';

function Payment() {
  const [paymentStatus, setPaymentStatus] = useState('');

  const initiatePayment = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/create_order/', {
        method: 'POST',
      });

      const order = await response.json();
      if (order.error) {
        setPaymentStatus('Failed to create order');
        return;
      }

      const options = {
        key: 'your_key_id', // Replace with your Razorpay key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Agriculture Platform',
        description: 'Crop Product Purchase',
        order_id: order.id,
        handler: function (response) {
          console.log('Payment Response:', response);
          setPaymentStatus('✅ Payment Successful!');
          
          // ✅ Clear orders on success
          localStorage.removeItem('orders');
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '1234567890',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      setPaymentStatus('❌ Payment failed');
      console.error('Error:', error);
    }
  };

  return (
    <div className="payment-container">
      <h2>💳 Payment Page</h2>
      <button onClick={initiatePayment}>Pay with Razorpay</button>
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </div>
  );
}

export default Payment;
