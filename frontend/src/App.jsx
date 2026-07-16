import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#12161a', color: 'white', minHeight: '100vh' }}>
        
        {/* HEADER / NAVBAR */}
        <div style={{ 
          backgroundColor: '#0f1115', 
          padding: '20px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid #222' 
        }}>
          {/* Clicking the title takes you back home */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ color: '#ffb6c1', margin: 0 }}>My E-Commerce App</h1>
          </Link>
          
          <div>
            {/* We use Link instead of button so React can switch pages instantly */}
            <Link to="/login">
              <button style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Login
              </button>
            </Link>
            
            <Link to="/register">
              <button style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* PAGE ROUTES */}
        <Routes>
          {/* Home / Landing Page */}
          <Route path="/" element={
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              <h2>Welcome to the Store!</h2>
              <p>Your frontend is successfully connected and styled.</p>
            </div>
          } />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Register Page */}
          <Route path="/register" element={<Signup />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;