import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface demoUsersInterface {
    password: string;
    name: string;
    redirect: string
}

/* ── Demo credentials per role ── */
const demoUsers: Record<string, demoUsersInterface> = {
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
                {/* ── Right Panel — Login Form ── */}
                <div className="login-right">
                    <div className="login-form-wrapper">
                        {/* Header */}
                        <div className="login-form-header">
                            <h2 className="login-form-title">PetPooja</h2>
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
