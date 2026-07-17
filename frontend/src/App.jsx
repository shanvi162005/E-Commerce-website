import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  // A quick helper to log out
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    window.location.href = '/login'; // Redirect to login
  };

  const token = localStorage.getItem('token');

  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Navigation Bar */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 30px',
          background: '#333',
          color: 'white'
        }}>
          <h2 style={{ margin: 0 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>⚡ MyStore</Link>
          </h2>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart 🛒</Link>
            <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin Panel 🛠️</Link>
            
            {!token ? (
              <>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Sign Up</Link>
              </>
            ) : (
              <button 
                onClick={handleLogout} 
                style={{ 
                  background: 'red', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Page Routing Configuration */}
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;