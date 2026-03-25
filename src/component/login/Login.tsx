import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── Demo credentials per role ── */
const demoUsers: Record<string, { password: string; name: string; redirect: string }> = {
    admin: { password: 'admin123', name: 'Rahul Verma', redirect: '/management' },
    manager: { password: 'manager123', name: 'Priya Sharma', redirect: '/manager' },
    cashier: { password: 'cashier123', name: 'Amit Desai', redirect: '/cashier' },
    waiter: { password: 'waiter123', name: 'Karan Joshi', redirect: '/waiter' },
    kitchen: { password: 'kitchen123', name: 'Sandeep Patil', redirect: '/kitchen' },
};

const roles = [
    { key: 'admin', label: 'Admin', icon: 'ri-shield-star-line', color: '#818CF8' },
    { key: 'manager', label: 'Manager', icon: 'ri-user-settings-line', color: '#F59E0B' },
    { key: 'cashier', label: 'Cashier', icon: 'ri-money-rupee-circle-line', color: '#34D399' },
    { key: 'waiter', label: 'Waiter', icon: 'ri-user-heart-line', color: '#FB923C' },
    { key: 'kitchen', label: 'Kitchen', icon: 'ri-chef-hat-line', color: '#FB7185' },
];

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const user = demoUsers[username.toLowerCase()];
        if (!user) {
            setError('User not found. Try: admin, manager, cashier, waiter, or kitchen');
            return;
        }
        if (user.password !== password) {
            setError('Incorrect password. Check the quick-login cards below.');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            navigate(user.redirect);
        }, 800);
    };

    const handleQuickLogin = (roleKey: string) => {
        const user = demoUsers[roleKey];
        setUsername(roleKey);
        setPassword(user.password);
        setSelectedRole(roleKey);
        setError('');
        setLoading(true);
        setTimeout(() => {
            navigate(user.redirect);
        }, 800);
    };

    return (
        <div className="login-page">
            {/* ── Animated background elements ── */}
            <div className="login-bg">
                <div className="login-blob blob-1"></div>
                <div className="login-blob blob-2"></div>
                <div className="login-blob blob-3"></div>
                <div className="login-grid-pattern"></div>
            </div>

            <div className="login-container">
                {/* ── Left Panel — Branding ── */}
                <div className="login-left">
                    <div className="login-left-content">
                        {/* Logo */}
                        <div className="login-logo">
                            <div className="login-logo-icon">
                                <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                                    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
                                </svg>
                            </div>
                            <div>
                                <div className="login-brand-name">Petpooja</div>
                                <div className="login-brand-tag">Restaurant Management</div>
                            </div>
                        </div>

                        {/* Hero text */}
                        <div className="login-hero">
                            <h1 className="login-hero-title">
                                Manage your<br />
                                restaurant<br />
                                <span className="login-hero-accent">smarter.</span>
                            </h1>
                            <p className="login-hero-desc">
                                POS, Kitchen, Tables, Billing, Staff — everything in one beautiful dashboard.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="login-stats">
                            <div className="login-stat">
                                <div className="login-stat-val">5</div>
                                <div className="login-stat-label">Outlets</div>
                            </div>
                            <div className="login-stat-divider"></div>
                            <div className="login-stat">
                                <div className="login-stat-val">₹5.4L</div>
                                <div className="login-stat-label">Today's Revenue</div>
                            </div>
                            <div className="login-stat-divider"></div>
                            <div className="login-stat">
                                <div className="login-stat-val">47</div>
                                <div className="login-stat-label">Live Orders</div>
                            </div>
                        </div>
                    </div>
                    <div className="login-left-footer">
                        © 2026 Petpooja · Built with ❤️ for restaurants
                    </div>
                </div>

                {/* ── Right Panel — Login Form ── */}
                <div className="login-right">
                    <div className="login-form-wrapper">
                        {/* Header */}
                        <div className="login-form-header">
                            <h2 className="login-form-title">Welcome back</h2>
                            <p className="login-form-sub">Sign in to your account to continue</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="login-form">
                            {/* Username */}
                            <div className="login-field">
                                <label className="login-label">
                                    <i className="ri-user-line"></i> Username
                                </label>
                                <div className="login-input-wrap">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={e => { setUsername(e.target.value); setError(''); }}
                                        placeholder="Enter your username"
                                        className="login-input"
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="login-field">
                                <label className="login-label">
                                    <i className="ri-lock-line"></i> Password
                                </label>
                                <div className="login-input-wrap">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => { setPassword(e.target.value); setError(''); }}
                                        placeholder="Enter your password"
                                        className="login-input"
                                        autoComplete="current-password"
                                    />
                                    <button type="button" className="login-eye" onClick={() => setShowPassword(!showPassword)}>
                                        <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                                    </button>
                                </div>
                            </div>

                            {/* Remember + Forgot */}
                            <div className="login-options">
                                <label className="login-remember">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <span className="login-forgot">Forgot password?</span>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="login-error">
                                    <i className="ri-error-warning-line"></i>
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button type="submit" className={`login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                                {loading ? (
                                    <>
                                        <div className="login-spinner"></div>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <i className="ri-login-box-line"></i>
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="login-divider">
                            <span>or quick login as</span>
                        </div>

                        {/* Quick Login Cards */}
                        <div className="login-quick-roles">
                            {roles.map(role => (
                                <button
                                    key={role.key}
                                    onClick={() => handleQuickLogin(role.key)}
                                    className={`login-role-card ${selectedRole === role.key ? 'active' : ''}`}
                                    style={{ '--role-color': role.color } as React.CSSProperties}
                                >
                                    <div className="login-role-icon">
                                        <i className={role.icon}></i>
                                    </div>
                                    <span className="login-role-label">{role.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Credentials Hint */}
                        <div className="login-hint">
                            <i className="ri-information-line"></i>
                            <span>Demo: Use role name as username (e.g. <strong>admin</strong> / <strong>admin123</strong>)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
