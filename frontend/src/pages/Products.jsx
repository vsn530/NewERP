import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import api from '../api';

export default function Products() {
    const { isAdmin } = useAuth();
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', stock_quantity: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchProducts = () => {
        api.get('/products').then(res => setProducts(res.data)).catch(() => { });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (editingId) {
                await api.put(`/products/${editingId}`, form);
                setEditingId(null);
            } else {
                await api.post('/products', form);
            }
            setForm({ name: '', price: '', stock_quantity: '' });
            fetchProducts();
        } catch (err) {
            setError(err.response?.data?.error || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (p) => {
        setEditingId(p.id);
        setForm({ name: p.name, price: p.price, stock_quantity: p.stock_quantity });
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to delete');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({ name: '', price: '', stock_quantity: '' });
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Product Catalog</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your inventory and pricing here</p>
                </div>
            </div>

            {error && <div className="error-text">{error}</div>}

            {isAdmin && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {editingId ? (
                            <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg> Edit Product</>
                        ) : (
                            <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> Add New Product</>
                        )}
                    </h3>

                    <form onSubmit={handleSubmit} className="flex-row" style={{ flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div style={{ flex: '1 1 250px' }}>
                            <label>Product Name</label>
                            <input
                                placeholder="e.g. Mechanical Keyboard"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div style={{ flex: '1 1 120px' }}>
                            <label>Price (₹)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                required
                                step="0.01"
                            />
                        </div>
                        <div style={{ flex: '1 1 120px' }}>
                            <label>Stock Qty</label>
                            <input
                                type="number"
                                placeholder="0"
                                value={form.stock_quantity}
                                onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button type="submit" disabled={loading}>
                                {editingId ? 'Save Changes' : 'Add Product'}
                            </button>
                            {editingId && (
                                <button type="button" onClick={handleCancel} className="outline">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Date Added</th>
                            {isAdmin && <th style={{ textAlign: 'right' }}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr><td colSpan={isAdmin ? 6 : 5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 1rem' }}>No products found in the catalog.</td></tr>
                        ) : (
                            products.map(p => (
                                <tr key={p.id}>
                                    <td style={{ color: 'var(--text-muted)' }}>#{p.id}</td>
                                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                                    <td>₹{p.price.toFixed(2)}</td>
                                    <td>
                                        <span className="badge" style={{
                                            background: p.stock_quantity > 10 ? '#dcfce7' : '#fee2e2',
                                            color: p.stock_quantity > 10 ? '#166534' : '#991b1b'
                                        }}>
                                            {p.stock_quantity} in stock
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-muted)' }}>{new Date(p.created_at).toLocaleDateString()}</td>
                                    {isAdmin && (
                                        <td style={{ textAlign: 'right' }}>
                                            <button onClick={() => handleEdit(p)} className="outline" style={{ padding: '0.25rem 0.5rem', marginRight: '0.5rem', fontSize: '0.75rem' }}>Edit</button>
                                            <button onClick={() => handleDelete(p.id)} className="danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Delete</button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
