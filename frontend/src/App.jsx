import React from 'react';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121212', color: 'white', fontFamily: 'sans-serif' }}>
      {/* Sleek Dark Header Container */}
      <div style={{
        backgroundColor: '#0f1115', // Sleek dark charcoal black
        color: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #222' // Subtle divider line
      }}>
        <h1 style={{ color: 'pink', margin: 0 }}>My E-Commerce App</h1>
        <div>
          <button style={{ 
            marginRight: '10px', 
            padding: '8px 16px', 
            backgroundColor: '#9d9a9a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}>
            Login
          </button>
          <button style={{ 
            padding: '8px 16px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}>
            Register
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Welcome to the Store!</h2>
        <p>Your frontend is successfully connected and styled.</p>
      </div>
    </div>
  );
}

export default App;