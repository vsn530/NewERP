import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CreateOrder() {
    const [customerName, setCustomerName] = useState('');
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([{ productId: '', quantity: 1 }]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/products').then(res => setProducts(res.data)).catch(() => { });
    }, []);

    const addItem = () => {
        setItems([...items, { productId: '', quantity: 1 }]);
    };

    const removeItem = (index) => {
        if (items.length === 1) return;
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = field === 'quantity' ? parseInt(value) || 0 : parseInt(value) || '';
        setItems(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const validItems = items.filter(i => i.productId && i.quantity > 0);
        if (validItems.length === 0) {
            setError('Add at least one valid item.');
            setLoading(false);
            return;
        }

        try {
            const res = await api.post('/orders', {
                customerName,
                items: validItems.map(i => ({ productId: parseInt(i.productId), quantity: i.quantity })),
            });
            setSuccess('Order created successfully!');
            setTimeout(() => navigate('/orders'), 1500);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Order</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 15 }}>
                    <label><strong>Customer Name:</strong></label><br />
                    <input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        placeholder="Enter customer name"
                        style={{ padding: 8, width: 300 }}
                    />
                </div>

                <h3>Order Items</h3>
                {items.map((item, index) => (
                    <div key={index} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <select
                            value={item.productId}
                            onChange={(e) => updateItem(index, 'productId', e.target.value)}
                            required
                            style={{ padding: 8 }}
                        >
                            <option value="">Select Product</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name} (₹{p.price} - Stock: {p.stock_quantity})
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                            style={{ padding: 8, width: 80 }}
                            placeholder="Qty"
                        />
                        {items.length > 1 && (
                            <button type="button" onClick={() => removeItem(index)} style={{ padding: '8px 12px' }}>
                                ✕
                            </button>
                        )}
                    </div>
                ))}

                <button type="button" onClick={addItem} style={{ padding: '8px 16px', marginBottom: 15 }}>
                    + Add Item
                </button>
                <br />
                <button type="submit" disabled={loading} style={{ padding: '10px 24px', fontWeight: 'bold' }}>
                    {loading ? 'Creating...' : 'Create Order'}
                </button>
            </form>
        </div>
    );
}
