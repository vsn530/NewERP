import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Layout() {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <nav style={{
                width: 200,
                background: '#2c3e50',
                color: 'white',
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h3 style={{ marginTop: 0 }}>Mini ERP</h3>
                <p style={{ fontSize: 12, color: '#bdc3c7' }}>{user?.email}</p>
                <hr style={{ borderColor: '#34495e', width: '100%' }} />

                <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                <Link to="/products" style={linkStyle}>Products</Link>
                <Link to="/customers" style={linkStyle}>Customers</Link>
                <Link to="/create-order" style={linkStyle}>Create Order</Link>
                <Link to="/orders" style={linkStyle}>Orders</Link>

                <div style={{ marginTop: 'auto' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main content */}
            <main style={{ flex: 1, padding: 30 }}>
                <Outlet />
            </main>
        </div>
    );
}

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 0',
    display: 'block',
    borderBottom: '1px solid #34495e',
};
