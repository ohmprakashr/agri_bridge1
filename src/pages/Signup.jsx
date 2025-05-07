import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Link } from 'react-router-dom';
import './Auth.css';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    district: '',
    phone_number: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm_password) {
      alert('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        form.phone_number + '@app.com',
        form.password
      );
      alert('Signup successful');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="district" placeholder="District" onChange={handleChange} required />
        <input name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>

      <div className="auth-footer">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
