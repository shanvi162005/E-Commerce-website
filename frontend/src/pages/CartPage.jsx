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
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>My Shopping Cart</h2>
            {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.productId._id} style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <div>
                                <h4>{item.productId.name}</h4>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.productId.price}</p>
                            </div>
                            <button onClick={() => handleRemove(item.productId._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', alignSelf: 'center' }}>
                                Remove
                            </button>
                        </div>
                    ))}
                    
                    {/* Display Total Price */}
                    <div style={{ marginTop: '20px', textAlign: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        Total Price: ${totalPrice.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;