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
                .catch(() => {});

            api.get('/users')
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setStaffList(res.data.filter(u => u.role === 'STAFF'));
                    }
                })
                .catch(() => {});
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
        <div style={{ maxWidth: '1100px' }}>
            {/* Page header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ marginBottom: '0.25rem' }}>Dashboard</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
                    Welcome back, <strong style={{ color: 'var(--text-secondary)' }}>{user?.email}</strong>
                    <span className={`badge badge-${isAdmin ? 'primary' : 'muted'}`} style={{ marginLeft: '10px', verticalAlign: 'middle' }}>
                        {user?.role}
                    </span>
                </p>
            </div>

            {/* Metric cards */}
            {isAdmin && summary && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.25rem',
                    marginBottom: '2.5rem',
                }}>
                    <MetricCard
                        title="Total Revenue"
                        value={`₹${Number(summary.totalRevenue).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                        color="#4f46e5"
                        bg="#eef2ff"
                        icon={<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>}
                    />
                    <MetricCard
                        title="Total Orders"
                        value={summary.totalOrders}
                        color="#0ea5e9"
                        bg="#f0f9ff"
                        icon={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>}
                    />
                    <MetricCard
                        title="Total Products"
                        value={summary.totalProducts}
                        color="#10b981"
                        bg="#f0fdf4"
                        icon={<><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>}
                    />
                    <MetricCard
                        title="Total Customers"
                        value={summary.totalCustomers}
                        color="#f59e0b"
                        bg="#fffbeb"
                        icon={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
                    />
                </div>
            )}

            {/* Staff management */}
            {isAdmin && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                    {/* Create staff */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
                                    <line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
                                </svg>
                                Create Staff Account
                            </div>
                        </div>

                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                            Add a new staff member who can manage orders and products.
                        </p>

                        {error && (
                            <div className="alert alert-error">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                                </svg>
                                {error}
                            </div>
                        )}

                        {staffResult && (
                            <div className="alert alert-success" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.625rem' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                                    </svg>
                                    Staff Account Created
                                </div>
                                <p style={{ fontSize: '0.8125rem', marginBottom: '0.5rem', color: 'inherit' }}>
                                    {staffResult.user.email}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.8125rem' }}>Temporary password:</span>
                                    <code style={{
                                        background: '#bbf7d0',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '5px',
                                        fontWeight: 700,
                                        letterSpacing: '0.05em',
                                    }}>
                                        {staffResult.temporaryPassword}
                                    </code>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.625rem', display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                                    </svg>
                                    Save this password — it won't be shown again.
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleCreateStaff} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
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
                            <button type="submit" disabled={loading} style={{ flexShrink: 0 }}>
                                {loading ? 'Creating...' : 'Create'}
                            </button>
                        </form>
                    </div>

                    {/* Staff list */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                                Active Staff
                            </div>
                            <span className="badge badge-muted">{staffList.length}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', maxHeight: '360px', overflowY: 'auto' }}>
                            {staffList.length === 0 ? (
                                <div className="empty-state" style={{ padding: '2rem' }}>
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                                    </svg>
                                    <p>No staff accounts yet</p>
                                </div>
                            ) : (
                                staffList.map(staff => (
                                    <div key={staff.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '0.75rem',
                                        background: 'var(--bg)',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border)',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '34px', height: '34px', borderRadius: '50%',
                                                background: 'var(--primary-light)',
                                                color: 'var(--primary)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 700, fontSize: '0.875rem', flexShrink: 0,
                                            }}>
                                                {staff.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{staff.email}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                    Joined {new Date(staff.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="badge badge-muted">{staff.role}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {!isAdmin && (
                <div className="card" style={{ maxWidth: '480px', textAlign: 'center', padding: '3rem' }}>
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    <h3 style={{ marginBottom: '0.5rem' }}>Staff Dashboard</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        Use the navigation on the left to manage products, customers, and orders.
                    </p>
                </div>
            )}
        </div>
    );
}

function MetricCard({ title, value, color, bg, icon }) {
    return (
        <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.375rem 1.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
        }}>
            <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.625rem', margin: '0 0 0.625rem' }}>
                    {title}
                </p>
                <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {value}
                </div>
            </div>
            <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: bg, color: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                </svg>
            </div>
        </div>
    );
}
