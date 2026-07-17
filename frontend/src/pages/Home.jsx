import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        console.log("Database response payload:", res.data); 
        setProducts(res.data);
      })
      .catch(err => console.log("Fetch error:", err));
  }, []);

  const addToCart = async (productId) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token'); 
    
    // Make the POST request with headers
    const response = await axios.post(
      'http://localhost:5000/api/cart/add', 
      { productId, quantity: 1 }, 
      { 
        headers: { 
          Authorization: `Bearer ${token}` 
        } 
      }
    );
    
    alert("Product added to cart successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to add product to cart");
  }
};

  return (
    <div style={{ padding: '20px 4%', width: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ textAlign: 'center' }}>Our Products</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
        gap: '15px', 
        width: '100%' 
      }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '140px', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '4px' }} 
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p style={{ fontWeight: 'bold' }}>${product.price}</p>
            <button 
              onClick={() => addToCart(product._id)} 
              style={{ padding: '8px 12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;