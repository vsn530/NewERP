import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CreateOrder() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [items, itemsSet] = useState([{ productId: '', quantity: 1 }]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        api.get('/products').then(res => setProducts(res.data)).catch(() => { });
    }, []);

    const addItem = () => itemsSet([...items, { productId: '', quantity: 1 }]);
    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        itemsSet(newItems);
    };
    const removeItem = (index) => {
        itemsSet(items.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const validItems = items.filter(i => i.productId && i.quantity > 0);
        if (validItems.length === 0) {
            setError('Please add at least one valid item');
            setLoading(false);
            return;
        }

        try {
            await api.post('/orders', {
                customerName,
                items: validItems.map(i => ({ productId: parseInt(i.productId, 10), quantity: parseInt(i.quantity, 10) })),
            });
            setSuccess('Order created successfully! Redirecting...');
            setTimeout(() => navigate('/orders'), 1500);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button type="button" onClick={() => navigate('/orders')} className="outline" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                </button>
                <div>
                    <h1 style={{ marginBottom: '0.25rem' }}>Create New Order</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Process a new sale and update inventory</p>
                </div>
            </div>

            {error && <div className="error-text">{error}</div>}
            {success && (
                <div style={{ padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    {success}
                </div>
            )}

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Customer Details</h3>
                        <label>Customer Name</label>
                        <input
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                            placeholder="e.g. Acme Corp"
                            style={{ maxWidth: '400px' }}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>Order Items</h3>
                            <button type="button" onClick={addItem} className="outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                Add Row
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {items.map((item, index) => (
                                <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ flex: '1' }}>
                                        <select
                                            value={item.productId}
                                            onChange={(e) => updateItem(index, 'productId', e.target.value)}
                                            required
                                        >
                                            <option value="">Select a Product...</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id} disabled={p.stock_quantity <= 0}>
                                                    {p.name} — ₹{p.price.toFixed(2)} ({p.stock_quantity > 0 ? `${p.stock_quantity} in stock` : 'Out of Stock'})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ width: '120px' }}>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                            required
                                            placeholder="Qty"
                                        />
                                    </div>
                                    {items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                            className="danger outline"
                                            style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            title="Remove Item"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" className="outline" onClick={() => navigate('/orders')} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" disabled={loading || items.length === 0} style={{ minWidth: '150px' }}>
                            {loading ? 'Creating Order...' : 'Submit Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
