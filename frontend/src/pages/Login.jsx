import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
                navigate('/app/dashboard');
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
            setError(err.response?.data?.error || 'Password must be at least 6 characters.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Animated gradient side panel */}
            <div className="login-side-panel">
                <div className="login-side-content">
                    {/* Floating orbs */}
                    <div className="login-orb orb-1" />
                    <div className="login-orb orb-2" />
                    <div className="login-orb orb-3" />

                    {/* Grid pattern */}
                    <div className="login-grid-pattern" />

                    <div className="login-side-text">
                        <Link to="/" className="login-side-logo">
                            <div className="login-logo-mark">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </div>
                            Mini ERP
                        </Link>
                        <h2 className="login-side-title">Manage your business<br />with confidence</h2>
                        <p className="login-side-desc">Products, customers, orders and analytics — all in one beautiful platform.</p>

                        {/* Animated feature pills */}
                        <div className="login-pills">
                            <div className="login-pill pill-float-1">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                                Live Analytics
                            </div>
                            <div className="login-pill pill-float-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                                Customer CRM
                            </div>
                            <div className="login-pill pill-float-3">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                                Inventory
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form side */}
            <div className="login-form-side">
                <div className="login-form-container">
                    {/* Mobile logo */}
                    <Link to="/" className="login-mobile-logo">
                        <div className="login-logo-mark" style={{ width: '36px', height: '36px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                    </Link>

                    <div className="login-form-header">
                        <h1 className="login-title">
                            {mustChangePasswordState ? 'Set new password' : 'Welcome back'}
                        </h1>
                        <p className="login-subtitle">
                            {mustChangePasswordState
                                ? 'Choose a secure password to protect your account'
                                : 'Sign in to your Mini ERP account'}
                        </p>
                    </div>

                    {error && (
                        <div className="login-error">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            {error}
                        </div>
                    )}

                    {mustChangePasswordState ? (
                        <form onSubmit={handleChangePassword} className="login-form">
                            <div className="login-field">
                                <label>New Password</label>
                                <div className="login-input-wrap">
                                    <svg className="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        placeholder="At least 6 characters"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="login-submit" disabled={loading}>
                                {loading ? <><span className="login-spinner" /> Updating...</> : 'Set Password'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin} className="login-form">
                            <div className="login-field">
                                <label>Email Address</label>
                                <div className="login-input-wrap">
                                    <svg className="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="admin@minierp.com"
                                        autoComplete="email"
                                    />
                                </div>
                            </div>
                            <div className="login-field">
                                <label>Password</label>
                                <div className="login-input-wrap">
                                    <svg className="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="login-submit" disabled={loading}>
                                {loading ? <><span className="login-spinner" /> Signing in...</> : 'Sign In'}
                            </button>
                        </form>
                    )}

                    <p className="login-footer-text">
                        <Link to="/">← Back to home</Link>
                    </p>
                </div>
            </div>

            <style>{loginStyles}</style>
        </div>
    );
}

const loginStyles = `
.login-page {
    display: flex;
    min-height: 100vh;
    background: #ffffff;
    font-family: 'Inter', system-ui, sans-serif;
}

/* ── Side Panel ── */
.login-side-panel {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4f46e5 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
}

.login-side-content {
    position: relative;
    z-index: 2;
    max-width: 420px;
}

/* Orbs */
.login-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    animation: orbFloat 12s ease-in-out infinite;
}
.orb-1 {
    width: 350px; height: 350px;
    background: rgba(139, 92, 246, 0.4);
    top: -80px; left: -80px;
    animation-delay: 0s;
}
.orb-2 {
    width: 280px; height: 280px;
    background: rgba(6, 182, 212, 0.35);
    bottom: -60px; right: -60px;
    animation-delay: -4s;
}
.orb-3 {
    width: 200px; height: 200px;
    background: rgba(244, 114, 182, 0.3);
    top: 50%; left: 60%;
    animation-delay: -8s;
}

@keyframes orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(20px, -30px) scale(1.1); }
    66% { transform: translate(-15px, 20px) scale(0.9); }
}

/* Grid pattern */
.login-grid-pattern {
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image: 
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: gridSlide 20s linear infinite;
}
@keyframes gridSlide {
    0% { transform: translate(0, 0); }
    100% { transform: translate(40px, 40px); }
}

.login-side-text {
    position: relative;
    z-index: 2;
}

.login-side-logo {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    color: white;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.125rem;
    margin-bottom: 3rem;
    letter-spacing: -0.02em;
}

.login-logo-mark {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-side-title {
    font-size: 2rem;
    font-weight: 800;
    color: white;
    line-height: 1.2;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
}

.login-side-desc {
    font-size: 1rem;
    color: rgba(255,255,255,0.7);
    line-height: 1.6;
    margin-bottom: 2.5rem;
}

/* Floating pills */
.login-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
}
.login-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.4rem 0.875rem;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: rgba(255,255,255,0.9);
    animation: pillFloat 5s ease-in-out infinite;
}
.pill-float-1 { animation-delay: 0s; }
.pill-float-2 { animation-delay: -1.5s; }
.pill-float-3 { animation-delay: -3s; }

@keyframes pillFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
}

/* ── Form Side ── */
.login-form-side {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: #ffffff;
    position: relative;
}

.login-form-container {
    width: 100%;
    max-width: 380px;
    animation: formSlideIn 0.6s ease-out forwards;
}

@keyframes formSlideIn {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
}

.login-mobile-logo {
    display: none;
    margin-bottom: 2rem;
    text-decoration: none;
}
.login-mobile-logo .login-logo-mark {
    background: #4f46e5;
    border: none;
}

.login-form-header {
    margin-bottom: 2rem;
}

.login-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.03em;
    margin-bottom: 0.5rem;
}

.login-subtitle {
    font-size: 0.9375rem;
    color: #64748b;
}

/* Error */
.login-error {
    display: flex;
    align-items: flex-start;
    gap: 0.625rem;
    padding: 0.875rem 1rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 10px;
    color: #dc2626;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    animation: shake 0.4s ease-out;
}
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
}
.login-error svg { flex-shrink: 0; margin-top: 1px; }

/* Form */
.login-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.login-field label {
    display: block;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.4rem;
    letter-spacing: 0.01em;
}

.login-input-wrap {
    position: relative;
}
.login-input-icon {
    position: absolute;
    left: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    pointer-events: none;
    transition: color 0.2s;
}
.login-input-wrap input {
    width: 100%;
    padding: 0.75rem 0.875rem 0.75rem 2.75rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.9375rem;
    font-family: inherit;
    color: #0f172a;
    background: #f8fafc;
    outline: none;
    transition: all 0.25s ease;
}
.login-input-wrap input::placeholder {
    color: #94a3b8;
}
.login-input-wrap input:focus {
    background: #ffffff;
    border-color: #4f46e5;
    box-shadow: 0 0 0 4px rgba(79,70,229,0.1);
}
.login-input-wrap:focus-within .login-input-icon {
    color: #4f46e5;
}

/* Submit button */
.login-submit {
    width: 100%;
    padding: 0.8rem;
    margin-top: 0.5rem;
    font-size: 0.9375rem;
    font-weight: 600;
    font-family: inherit;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px -3px rgba(79,70,229,0.45);
    position: relative;
    overflow: hidden;
}
.login-submit::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s ease;
}
.login-submit:hover:not(:disabled)::before {
    left: 100%;
}
.login-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px -5px rgba(79,70,229,0.55);
}
.login-submit:active:not(:disabled) {
    transform: translateY(0);
}
.login-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

/* Spinner */
.login-spinner {
    width: 16px; height: 16px;
    border: 2.5px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Footer text */
.login-footer-text {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.875rem;
    color: #94a3b8;
}
.login-footer-text a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
}
.login-footer-text a:hover {
    color: #4338ca;
}

/* ── Responsive ── */
@media (max-width: 900px) {
    .login-side-panel { display: none; }
    .login-form-side { flex: unset; width: 100%; }
    .login-mobile-logo { display: block; }
    .login-form-container { max-width: 420px; }
}
`;
