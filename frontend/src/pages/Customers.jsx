import { useState, useEffect } from 'react';
import api from '../api';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCustomers = () => {
        api.get('/customers').then(res => setCustomers(res.data)).catch(() => {});
    };

    useEffect(() => { fetchCustomers(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            await api.post('/customers', form);
            setForm({ name: '', email: '', phone: '' });
            setSuccess('Customer added successfully!');
            fetchCustomers();
            setTimeout(() => setSuccess(''), 4000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create customer');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '1100px' }}>
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <h1>Customers</h1>
                    <p>Manage your client directory</p>
                </div>
                <span className="badge badge-muted" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
                    {customers.length} contact{customers.length !== 1 ? 's' : ''}
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
            {success && (
                <div className="alert alert-success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    {success}
                </div>
            )}

            {/* Add customer form */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="card-header" style={{ marginBottom: '1.25rem' }}>
                    <div className="card-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
                            <line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
                        </svg>
                        Add New Customer
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div style={{ flex: '1 1 180px' }}>
                        <label>Full Name</label>
                        <input
                            placeholder="John Doe"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ flex: '1 1 150px' }}>
                        <label>Phone (Optional)</label>
                        <input
                            placeholder="+1 234 567 8900"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Customer'}
                    </button>
                </form>
            </div>

            {/* Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan={5}>
                                    <div className="empty-state">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                        </svg>
                                        <p>No customers in directory yet</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            customers.map(c => (
                                <tr key={c.id}>
                                    <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>#{c.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '30px', height: '30px', borderRadius: '50%',
                                                background: 'var(--primary-light)', color: 'var(--primary)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 700, fontSize: '0.75rem', flexShrink: 0,
                                            }}>
                                                {c.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="td-main">{c.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <a href={`mailto:${c.email}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                                            {c.email}
                                        </a>
                                    </td>
                                    <td style={{ color: 'var(--text-muted)' }}>{c.phone || '—'}</td>
                                    <td style={{ color: 'var(--text-muted)' }}>
                                        {new Date(c.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
