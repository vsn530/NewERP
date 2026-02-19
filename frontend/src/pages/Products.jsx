import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import api from '../api';

export default function Products() {
    const { isAdmin } = useAuth();
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', stock_quantity: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const fetchProducts = () => {
        api.get('/products').then(res => setProducts(res.data)).catch(() => { });
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
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
        }
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setForm({ name: product.name, price: product.price, stock_quantity: product.stock_quantity });
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (err) {
            setError(err.response?.data?.error || 'Delete failed');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({ name: '', price: '', stock_quantity: '' });
    };

    return (
        <div>
            <h2>Products</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {isAdmin && (
                <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                    <h3>{editingId ? 'Edit Product' : 'Add Product'}</h3>
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        style={{ padding: 8, marginRight: 10 }}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                        step="0.01"
                        style={{ padding: 8, marginRight: 10 }}
                    />
                    <input
                        type="number"
                        placeholder="Stock Qty"
                        value={form.stock_quantity}
                        onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })}
                        required
                        style={{ padding: 8, marginRight: 10 }}
                    />
                    <button type="submit" style={{ padding: '8px 16px', marginRight: 5 }}>
                        {editingId ? 'Update' : 'Add'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancel} style={{ padding: '8px 16px' }}>
                            Cancel
                        </button>
                    )}
                </form>
            )}

            <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Created</th>
                        {isAdmin && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>₹{p.price.toFixed(2)}</td>
                            <td>{p.stock_quantity}</td>
                            <td>{new Date(p.created_at).toLocaleDateString()}</td>
                            {isAdmin && (
                                <td>
                                    <button onClick={() => handleEdit(p)} style={{ marginRight: 5 }}>Edit</button>
                                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {products.length === 0 && <p>No products found.</p>}
        </div>
    );
}
