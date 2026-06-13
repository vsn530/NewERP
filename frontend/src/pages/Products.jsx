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
        api.get('/products').then(res => setProducts(res.data)).catch(() => {});
    };

    useEffect(() => { fetchProducts(); }, []);

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div style={{ maxWidth: '1100px' }}>
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <h1>Products</h1>
                    <p>Manage your inventory and pricing</p>
                </div>
                <span className="badge badge-muted" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
                    {products.length} item{products.length !== 1 ? 's' : ''}
                </span>
            </div>

            {error && (
                <div className="alert alert-error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                </div>
            )}

            {/* Add / Edit form */}
            {isAdmin && (
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <div className="card-header" style={{ marginBottom: '1.25rem' }}>
                        <div className="card-title">
                            {editingId ? (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                    Edit Product
                                </>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                                    </svg>
                                    Add Product
                                </>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div style={{ flex: '1 1 220px' }}>
                            <label>Product Name</label>
                            <input
                                placeholder="e.g. Mechanical Keyboard"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div style={{ flex: '0 1 140px' }}>
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
                        <div style={{ flex: '0 1 120px' }}>
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
                                {editingId ? 'Save' : 'Add Product'}
                            </button>
                            {editingId && (
                                <button type="button" onClick={handleCancel} className="outline">Cancel</button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            {/* Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Added</th>
                            {isAdmin && <th style={{ textAlign: 'right' }}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={isAdmin ? 6 : 5}>
                                    <div className="empty-state">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
                                        </svg>
                                        <p>No products in catalog yet</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            products.map(p => (
                                <tr key={p.id}>
                                    <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>#{p.id}</td>
                                    <td className="td-main">{p.name}</td>
                                    <td style={{ fontWeight: 500 }}>₹{Number(p.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                    <td>
                                        <span className={`badge ${p.stock_quantity > 10 ? 'badge-success' : p.stock_quantity > 0 ? 'badge-warning' : 'badge-danger'}`}>
                                            {p.stock_quantity > 0 ? `${p.stock_quantity} in stock` : 'Out of stock'}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-muted)' }}>
                                        {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                    </td>
                                    {isAdmin && (
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                                <button onClick={() => handleEdit(p)} className="ghost" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(p.id)} className="ghost" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem', color: 'var(--danger)' }}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
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
