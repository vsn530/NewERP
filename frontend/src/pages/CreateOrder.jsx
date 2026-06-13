import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CreateOrder() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [items, setItems] = useState([{ productId: '', quantity: 1 }]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        api.get('/products').then(res => setProducts(res.data)).catch(() => {});
    }, []);

    const addItem = () => setItems([...items, { productId: '', quantity: 1 }]);
    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };
    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const getOrderTotal = () => {
        return items.reduce((sum, item) => {
            const product = products.find(p => p.id === parseInt(item.productId));
            if (product && item.quantity > 0) {
                return sum + product.price * item.quantity;
            }
            return sum;
        }, 0);
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
            setTimeout(() => navigate('/app/orders'), 1500);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '720px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '2rem' }}>
                <button
                    type="button"
                    onClick={() => navigate('/app/orders')}
                    className="outline icon-btn"
                    style={{ padding: '0.5rem' }}
                    aria-label="Back to orders"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                    </svg>
                </button>
                <div>
                    <h1 style={{ marginBottom: '0.125rem' }}>Create Order</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>Process a new sale and update inventory</p>
                </div>
            </div>

            {error && (
                <div className="alert alert-error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                </div>
            )}
            {success && (
                <div className="alert alert-success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    {success}
                </div>
            )}

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    {/* Customer section */}
                    <div>
                        <SectionTitle icon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                            </svg>
                        }>
                            Customer Details
                        </SectionTitle>
                        <div style={{ maxWidth: '360px' }}>
                            <label>Customer Name</label>
                            <input
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                required
                                placeholder="e.g. Acme Corp"
                            />
                        </div>
                    </div>

                    {/* Items section */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <SectionTitle icon={
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                                </svg>
                            }>
                                Order Items
                            </SectionTitle>
                            <button type="button" onClick={addItem} className="outline" style={{ fontSize: '0.8125rem', padding: '0.4rem 0.75rem' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                                Add Item
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {items.map((item, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    gap: '0.75rem',
                                    alignItems: 'flex-end',
                                    padding: '0.875rem',
                                    background: 'var(--bg)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                }}>
                                    <div style={{ flex: 1 }}>
                                        {index === 0 && <label>Product</label>}
                                        <select
                                            value={item.productId}
                                            onChange={(e) => updateItem(index, 'productId', e.target.value)}
                                            required
                                        >
                                            <option value="">Select product...</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id} disabled={p.stock_quantity <= 0}>
                                                    {p.name} — ₹{Number(p.price).toFixed(2)} ({p.stock_quantity > 0 ? `${p.stock_quantity} avail.` : 'Out'})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ width: '90px' }}>
                                        {index === 0 && <label>Qty</label>}
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                            required
                                            placeholder="1"
                                        />
                                    </div>
                                    {items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                            className="ghost icon-btn"
                                            style={{ color: 'var(--danger)', padding: '0.5rem' }}
                                            title="Remove item"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{
                        borderTop: '1px solid var(--border)',
                        paddingTop: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem',
                    }}>
                        <div>
                            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.125rem' }}>Estimated Total</div>
                            <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                                ₹{getOrderTotal().toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button type="button" className="outline" onClick={() => navigate('/app/orders')} disabled={loading}>
                                Cancel
                            </button>
                            <button type="submit" disabled={loading || items.length === 0} style={{ minWidth: '140px' }}>
                                {loading ? (
                                    <>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.7s linear infinite' }}>
                                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                                        </svg>
                                        Creating...
                                    </>
                                ) : 'Submit Order'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

function SectionTitle({ children, icon }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.875rem',
            paddingBottom: '0.625rem',
            borderBottom: '1px solid var(--border)',
        }}>
            <span style={{ color: 'var(--primary)' }}>{icon}</span>
            {children}
        </div>
    );
}
