import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Sending registration request...');
      
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });

      console.log('Registration successful!', response.data);
      alert('Account registered successfully! 🎉 You can now log in.');

    } catch (err) {
      console.error('Registration error:', err);
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Register</h2>
      
      <form onSubmit={handleRegisterSubmit} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '1rem', color: '#ccc', textAlign: 'center' }}>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Choose a username"
            required
            style={{ padding: '12px', backgroundColor: '#2d3238', color: 'white', border: '1px solid #444', borderRadius: '4px', fontSize: '1rem' }}
          />
        </div>

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
            placeholder="Create a password"
            required
            style={{ padding: '12px', backgroundColor: '#2d3238', color: 'white', border: '1px solid #444', borderRadius: '4px', fontSize: '1rem' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;