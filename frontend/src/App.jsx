import { useState } from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  // Use state to track which page to display
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      {/* Header Navigation area */}
      <nav style={{ padding: '20px', background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ margin: '0 0 10px 0' }}>My E-Commerce App</h1>
        <button 
          onClick={() => setIsLogin(false)} 
          style={{ 
            marginRight: '10px', 
            padding: '8px 15px', 
            backgroundColor: !isLogin ? '#007bff' : '#ccc', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Register
        </button>
        <button 
          onClick={() => setIsLogin(true)} 
          style={{ 
            padding: '8px 15px', 
            backgroundColor: isLogin ? '#28a745' : '#ccc', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Log In
        </button>
      </nav>

      {/* Conditionally display Signup or Login based on isLogin state */}
      <main style={{ padding: '20px' }}>
        {isLogin ? <Login /> : <Signup />}
      </main>
    </div>
  );
}

export default App;