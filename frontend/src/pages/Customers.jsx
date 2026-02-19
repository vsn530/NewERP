import { useState, useEffect } from 'react';
import api from '../api';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchCustomers = () => {
        api.get('/customers').then(res => setCustomers(res.data)).catch(() => { });
    };

    useEffect(() => { fetchCustomers(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await api.post('/customers', form);
            setForm({ name: '', email: '', phone: '' });
            setSuccess('Customer created successfully!');
            fetchCustomers();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create customer');
        }
    };

    return (
        <div>
            <h2>Customers</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <h3>Add Customer</h3>
                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    style={{ padding: 8, marginRight: 10 }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    style={{ padding: 8, marginRight: 10 }}
                />
                <input
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={{ padding: 8, marginRight: 10 }}
                />
                <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
            </form>

            <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.phone || '-'}</td>
                            <td>{new Date(c.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {customers.length === 0 && <p>No customers found.</p>}
        </div>
    );
}
