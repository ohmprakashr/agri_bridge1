import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // adjust path
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ phone_number: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.phone_number + '@app.com', form.password);
      alert('Login successful');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <div className="auth-footer">
        <p>Don't have an account? <Link to="/Signup">Signup</Link></p>
        <p><Link to="/forgot-password">Forgot Password?</Link></p>
      </div>
    </div>
  );
}

export default Login;
