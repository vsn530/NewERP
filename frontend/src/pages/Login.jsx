import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import api from '../api';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mustChangePasswordState, setMustChangePasswordState] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });

            if (res.data.must_change_password) {
                login(res.data.user, res.data.token);
                setMustChangePasswordState(true);
            } else {
                login(res.data.user, res.data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/auth/change-password', { newPassword });
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to change password. Please ensure it is at least 6 characters.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary)', color: 'white', marginBottom: '1rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    </div>
                    <h2>{mustChangePasswordState ? 'Change Password' : 'Welcome Back'}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        {mustChangePasswordState ? 'Please secure your account with a new password' : 'Sign in to access your ERP dashboard'}
                    </p>
                </div>

                {error && <div className="error-text">{error}</div>}

                {mustChangePasswordState ? (
                    <form onSubmit={handleChangePassword}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label>New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={6}
                                placeholder="Enter a secure password"
                            />
                        </div>
                        <button type="submit" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Updating...' : 'Set Password'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@minierp.com"
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
