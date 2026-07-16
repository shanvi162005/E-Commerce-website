import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    try {
      console.log('Sending login request for:', email);
      
      // Make the API request to your backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      console.log('Login successful!', response.data);
      alert('Logged in successfully! 🎉');
      
      // Save the JWT token so the user stays logged in
      localStorage.setItem('token', response.data.token);

    } catch (err) {
      console.error('Login error:', err);
      // Show the actual error message from backend, or a default one
      alert(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Log In</h2>
      
      <form onSubmit={handleLoginSubmit} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '1rem', color: '#ccc', textAlign: 'center' }}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
            required
            style={{ padding: '12px', backgroundColor: '#2d3238', color: 'white', border: '1px solid #444', borderRadius: '4px', fontSize: '1rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '1rem', color: '#ccc', textAlign: 'center' }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
            required
            style={{ padding: '12px', backgroundColor: '#2d3238', color: 'white', border: '1px solid #444', borderRadius: '4px', fontSize: '1rem' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;