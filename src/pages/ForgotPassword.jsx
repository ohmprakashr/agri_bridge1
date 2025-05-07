import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import { Link } from 'react-router-dom';
import './Auth.css';

function ForgotPassword() {
  const [phone, setPhone] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    const email = phone + '@app.com';
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset link sent');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <div className="auth-footer">
        <p>Remembered your password? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default ForgotPassword;
