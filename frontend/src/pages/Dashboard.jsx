import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import api from '../api';

export default function Dashboard() {
    const { user, isAdmin } = useAuth();
    const [summary, setSummary] = useState(null);
    const [staffForm, setStaffForm] = useState({ email: '' });
    const [staffResult, setStaffResult] = useState(null);
    const [staffList, setStaffList] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAdmin) {
            api.get('/reports/summary')
                .then(res => {
                    if (typeof res.data === 'object' && res.data !== null && 'totalRevenue' in res.data) {
                        setSummary(res.data);
                    }
                })
                .catch(() => { });

            api.get('/users')
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setStaffList(res.data.filter(u => u.role === 'STAFF'));
                    }
                })
                .catch(() => { });
        }
    }, [isAdmin]);

    const handleCreateStaff = async (e) => {
        e.preventDefault();
        setError('');
        setStaffResult(null);
        setLoading(true);
        try {
            const res = await api.post('/users', { email: staffForm.email });
            setStaffResult(res.data);
            setStaffForm({ email: '' });
            setStaffList(prev => [res.data.user, ...prev]);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create staff');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user?.email} <span className="badge" style={{ marginLeft: '10px' }}>{user?.role}</span></p>
            </div>

            {isAdmin && summary && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    <MetricCard title="Total Revenue" value={`₹${summary.totalRevenue.toFixed(2)}`} icon={<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />} />
                    <MetricCard title="Total Orders" value={summary.totalOrders} icon={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>} />
                    <MetricCard title="Total Products" value={summary.totalProducts} icon={<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>} />
                    <MetricCard title="Total Customers" value={summary.totalCustomers} icon={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>} />
                </div>
            )}

            {isAdmin && (
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <div className="card" style={{ flex: '1 1 400px', maxWidth: '600px' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Create Staff Account</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Add a new staff member to manage orders and products.</p>
                        </div>

                        {error && <div className="error-text">{error}</div>}

                        {staffResult && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', marginBottom: '8px', fontWeight: 500 }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                    Staff Account Created
                                </div>
                                <p style={{ margin: '0 0 4px', fontSize: '0.875rem', color: '#166534' }}>Email: {staffResult.user.email}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                                    <span style={{ fontSize: '0.875rem', color: '#166534' }}>Temporary Password:</span>
                                    <code style={{ background: '#dcfce7', padding: '4px 8px', borderRadius: '4px', color: '#166534', fontWeight: 'bold' }}>
                                        {staffResult.temporaryPassword}
                                    </code>
                                </div>
                                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '12px', margin: 0 }}>⚠️ Please save this password. It will not be shown again.</p>
                            </div>
                        )}

                        <form onSubmit={handleCreateStaff} className="flex-row">
                            <div style={{ flex: 1 }}>
                                <label>Staff Email Address</label>
                                <input
                                    type="email"
                                    placeholder="staff@minierp.com"
                                    value={staffForm.email}
                                    onChange={(e) => setStaffForm({ email: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Account'}
                            </button>
                        </form>
                    </div>

                    <div className="card" style={{ flex: '1 1 400px' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Active Staff Accounts</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>List of currently active staff members.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto' }}>
                            {staffList.length === 0 ? (
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No staff accounts found.</p>
                            ) : (
                                staffList.map(staff => (
                                    <div key={staff.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                {staff.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.875rem' }}>{staff.email}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Created: {new Date(staff.created_at).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <span className="badge" style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'var(--surface)' }}>{staff.role}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MetricCard({ title, value, icon }) {
    return (
        <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>{title}</h3>
                <div style={{ color: 'var(--primary)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {icon}
                    </svg>
                </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)' }}>{value}</div>
        </div>
    );
}
