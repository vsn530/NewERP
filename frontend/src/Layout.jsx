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
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>
            {/* ── Sidebar ── */}
            <aside style={{
                width: '232px',
                flexShrink: 0,
                background: 'var(--sidebar-bg)',
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid rgba(255,255,255,0.05)',
            }}>
                {/* Logo */}
                <div style={{ padding: '1.5rem 1.25rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.75rem' }}>
                        <div style={{
                            width: '32px', height: '32px',
                            borderRadius: '8px',
                            background: 'var(--primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <span style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>Mini ERP</span>
                    </div>

                    {/* User chip */}
                    <div style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '0.625rem 0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                    }}>
                        <div style={{
                            width: '30px', height: '30px', borderRadius: '50%',
                            background: 'var(--primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.75rem', fontWeight: 700, color: 'white',
                            flexShrink: 0,
                        }}>
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1, marginBottom: '2px' }}>
                                {isAdmin ? 'Administrator' : 'Staff'}
                            </div>
                            <div style={{
                                fontSize: '0.8125rem', color: 'white', fontWeight: 500,
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                maxWidth: '130px',
                            }}>
                                {user?.email}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: '0 0.75rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <SideLabel>Main</SideLabel>
                    <NavLink to="/app/dashboard" active={isActive('/app/dashboard')} icon={DashIcon}>Dashboard</NavLink>
                    <NavLink to="/app/products"  active={isActive('/app/products')}  icon={ProductIcon}>Products</NavLink>
                    <NavLink to="/app/customers" active={isActive('/app/customers')} icon={CustomerIcon}>Customers</NavLink>

                    <SideLabel style={{ marginTop: '0.5rem' }}>Sales</SideLabel>
                    <NavLink to="/app/create-order" active={isActive('/app/create-order')} icon={CreateOrderIcon}>Create Order</NavLink>
                    <NavLink to="/app/orders"       active={isActive('/app/orders')}       icon={OrderIcon}>Order History</NavLink>
                </nav>

                {/* Sign out */}
                <div style={{ padding: '0.75rem' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#94a3b8',
                            borderRadius: '8px',
                            padding: '0.625rem',
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.18s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#e2e8f0'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; }}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* ── Main area ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Top bar */}
                <header style={{
                    height: '56px',
                    background: 'var(--surface)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 2rem',
                    flexShrink: 0,
                    gap: '0.75rem',
                }}>
                    <Breadcrumb location={location} />
                </header>

                {/* Page content */}
                <main style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

/* ── Sub-components ── */

function SideLabel({ children, style }) {
    return (
        <div style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#475569',
            padding: '0.875rem 0.625rem 0.375rem',
            ...style,
        }}>
            {children}
        </div>
    );
}

function NavLink({ to, active, icon: Icon, children }) {
    return (
        <Link
            to={to}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.5625rem 0.75rem',
                borderRadius: '7px',
                color: active ? 'white' : 'var(--sidebar-text)',
                background: active ? 'var(--primary)' : 'transparent',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                transition: 'all 0.16s ease',
                letterSpacing: '-0.01em',
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'white'; } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--sidebar-text)'; } }}
        >
            <Icon size={16} active={active} />
            {children}
        </Link>
    );
}

function Breadcrumb({ location }) {
    const map = {
        '/app/dashboard':    'Dashboard',
        '/app/products':     'Products',
        '/app/customers':    'Customers',
        '/app/create-order': 'Create Order',
        '/app/orders':       'Order History',
    };
    const label = map[location.pathname] || 'Page';
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mini ERP</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                <polyline points="9 18 15 12 9 6" />
            </svg>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
        </div>
    );
}

/* ── Icons ── */
function DashIcon({ size = 16 }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
}
function ProductIcon({ size = 16 }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
}
function CustomerIcon({ size = 16 }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function CreateOrderIcon({ size = 16 }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
}
function OrderIcon({ size = 16 }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
