import { useState, useEffect } from 'react';
import axios from 'axios';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Ensure you are accessing the items array correctly
            setCartItems(res.data.items || []);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemove = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/api/cart/remove', { productId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCart();
        } catch (err) {
            console.log(err);
        }
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + (item.productId.price * item.quantity);
    }, 0);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', color: '#fff' }}>
            <h2 style={{ textAlign: 'center' }}>My Shopping Cart</h2>
            {cartItems.length === 0 ? <p style={{ textAlign: 'center' }}>Your cart is empty.</p> : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.productId._id} style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', // Aligns Remove button vertically with text
                            margin: '20px 0', 
                            borderBottom: '1px solid #555', 
                            paddingBottom: '15px' 
                        }}>
                            {/* Left side: Item Details */}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{ margin: '0 0 5px 0' }}>{item.productId.name}</h4>
                                <p style={{ margin: '2px 0' }}>Quantity: {item.quantity}</p>
                                <p style={{ margin: '2px 0' }}>Price: ${item.productId.price}</p>
                            </div>
                            
                            {/* Right side: Remove Button */}
                            <button 
                                onClick={() => handleRemove(item.productId._id)} 
                                style={{ 
                                    background: 'red', 
                                    color: 'white', 
                                    border: 'none', 
                                    padding: '8px 15px', 
                                    cursor: 'pointer' 
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    
                    {/* Total Price aligned to the right */}
                    <div style={{ marginTop: '20px', textAlign: 'right', fontSize: '1.4rem', fontWeight: 'bold' }}>
                        Total Price: ${totalPrice.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;