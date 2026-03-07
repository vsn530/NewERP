import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Layout() {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)' }}>
            {/* Sidebar */}
            <nav style={{
                width: '260px',
                background: '#111827',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid rgba(255,255,255,0.1)',
            }}>
                <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary)', color: 'white' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.025em' }}>Mini ERP</h3>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem' }}>
                        <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Logged in as</p>
                        <p style={{ fontSize: '0.875rem', fontWeight: 500, margin: 0, textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.email}</p>
                    </div>
                </div>

                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                    <NavLink to="/dashboard" active={isActive('/dashboard')} icon={<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>}>Dashboard</NavLink>
                    <NavLink to="/products" active={isActive('/products')} icon={<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>}>Products</NavLink>
                    <NavLink to="/customers" active={isActive('/customers')} icon={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}>Customers</NavLink>
                    <NavLink to="/create-order" active={isActive('/create-order')} icon={<><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></>}>Create Order</NavLink>
                    <NavLink to="/orders" active={isActive('/orders')} icon={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>}>Orders</NavLink>
                </div>

                <div style={{ padding: '1rem' }}>
                    <button
                        onClick={handleLogout}
                        className="outline"
                        style={{ width: '100%', borderColor: 'rgba(255,255,255,0.1)', color: '#d1d5db', background: 'transparent' }}
                    >
                        Sign Out
                    </button>
                </div>
            </nav>

            {/* Main content */}
            <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
}

function NavLink({ to, active, icon, children }) {
    return (
        <Link
            to={to}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 1rem',
                borderRadius: '8px',
                color: active ? 'white' : '#9ca3af',
                background: active ? 'var(--primary)' : 'transparent',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent' }}
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {icon}
            </svg>
            {children}
        </Link>
    );
}
