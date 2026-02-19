import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import api from '../api';

export default function Dashboard() {
    const { user, isAdmin } = useAuth();
    const [summary, setSummary] = useState(null);
    const [staffForm, setStaffForm] = useState({ email: '' });
    const [staffResult, setStaffResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isAdmin) {
            api.get('/reports/summary')
                .then(res => setSummary(res.data))
                .catch(() => { });
        }
    }, [isAdmin]);

    const handleCreateStaff = async (e) => {
        e.preventDefault();
        setError('');
        setStaffResult(null);
        try {
            const res = await api.post('/users', { email: staffForm.email });
            setStaffResult(res.data);
            setStaffForm({ email: '' });
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create staff');
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {user?.email} ({user?.role})</p>

            {isAdmin && summary && (
                <div style={{ marginTop: 20 }}>
                    <h3>Reports Summary</h3>
                    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr><td><strong>Total Orders</strong></td><td>{summary.totalOrders}</td></tr>
                            <tr><td><strong>Total Revenue</strong></td><td>₹{summary.totalRevenue.toFixed(2)}</td></tr>
                            <tr><td><strong>Total Products</strong></td><td>{summary.totalProducts}</td></tr>
                            <tr><td><strong>Total Customers</strong></td><td>{summary.totalCustomers}</td></tr>
                        </tbody>
                    </table>
                </div>
            )}

            {isAdmin && (
                <div style={{ marginTop: 30 }}>
                    <h3>Create Staff User</h3>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {staffResult && (
                        <div style={{ background: '#e8f5e9', padding: 10, marginBottom: 10, border: '1px solid #4caf50' }}>
                            <p><strong>Staff created!</strong></p>
                            <p>Email: {staffResult.user.email}</p>
                            <p>Temporary Password: <strong>{staffResult.temporaryPassword}</strong></p>
                            <p style={{ color: 'red', fontSize: 12 }}>Save this password — it won't be shown again.</p>
                        </div>
                    )}
                    <form onSubmit={handleCreateStaff}>
                        <input
                            type="email"
                            placeholder="Staff email"
                            value={staffForm.email}
                            onChange={(e) => setStaffForm({ email: e.target.value })}
                            required
                            style={{ padding: 8, marginRight: 10 }}
                        />
                        <button type="submit" style={{ padding: '8px 16px' }}>Create Staff</button>
                    </form>
                </div>
            )}
        </div>
    );
}
