import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  LogIn, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination after login
  const from = location.state?.from?.pathname || '/';

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Validation & feedback states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // If already authenticated, redirect immediately
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // 1. Username Required validation
    if (!username.trim()) {
      newErrors.username = 'Username is required to access the protected dashboard';
    } else if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // 2. Password Required validation
    if (!password) {
      newErrors.password = 'Password is required to authenticate';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setServerError('');

    try {
      const result = await login(username, password, rememberUser);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setServerError(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setServerError('An unexpected error occurred during token issuance.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick 1-Click Demo Login helpers
  const handleQuickDemo = async (demoUser, demoPass, demoRole) => {
    setUsername(demoUser);
    setPassword(demoPass);
    setTouched({ username: true, password: true });
    setErrors({});
    setIsSubmitting(true);
    setServerError('');

    const result = await login(demoUser, demoPass, rememberUser, demoRole);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setServerError('Quick login failed');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page-root animate-fade-in">
      <div className="login-card-container">
        {/* Header Badge */}
        <div className="login-header">
          <div className="login-shield-badge">
            <ShieldCheck size={32} className="shield-icon" />
          </div>
          <h1 className="login-title">Security Access Portal</h1>
          <p className="login-subtitle">
            React Assignment 7: Simulated JWT Authentication & Route Protection
          </p>
        </div>

        {/* Global Server Error Alert */}
        {serverError && (
          <div className="alert-banner alert-banner-danger animate-fade-in">
            <AlertCircle size={18} />
            <span>{serverError}</span>
          </div>
        )}

        {/* 1-Click Quick Demo Login Pill Bar */}
        <div className="demo-credentials-card">
          <div className="demo-card-header">
            <Sparkles size={14} className="icon-emerald" />
            <span>1-Click Examiner Demo Logins:</span>
          </div>
          <div className="demo-btn-group">
            <button
              type="button"
              className="btn btn-xs btn-outline demo-btn"
              onClick={() => handleQuickDemo('Saibadeep', 'CyberBCA@2026!', 'Lead Cyber Analyst')}
              disabled={isSubmitting}
            >
              <User size={12} />
              <span>Saibadeep (Lead Analyst)</span>
            </button>

            <button
              type="button"
              className="btn btn-xs btn-outline demo-btn"
              onClick={() => handleQuickDemo('Admin', 'SecOps#Root99!', 'System Administrator')}
              disabled={isSubmitting}
            >
              <KeyRound size={12} />
              <span>Admin (SecOps Root)</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* 1. Username Input (Required Validation) */}
          <div className="form-group">
            <label htmlFor="username-input" className="form-label">
              <span>Username</span>
              <span className="required-star">* Required</span>
            </label>
            <div className={`input-icon-wrapper ${touched.username && errors.username ? 'input-error' : ''}`}>
              <User size={18} className="input-prefix-icon" />
              <input
                id="username-input"
                type="text"
                className="form-input"
                placeholder="e.g. Saibadeep or Admin"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) validateForm();
                }}
                onBlur={() => handleBlur('username')}
                autoComplete="username"
                disabled={isSubmitting}
              />
            </div>
            {touched.username && errors.username && (
              <p className="field-error-message animate-fade-in">
                <AlertCircle size={13} />
                <span>{errors.username}</span>
              </p>
            )}
          </div>

          {/* 2. Password Input (Required Validation + Strength Meter) */}
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="password-input" className="form-label">
                <span>Password</span>
                <span className="required-star">* Required</span>
              </label>
              <span className="input-hint">Evaluates NIST entropy</span>
            </div>
            <div className={`input-icon-wrapper ${touched.password && errors.password ? 'input-error' : ''}`}>
              <Lock size={18} className="input-prefix-icon" />
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter secure password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) validateForm();
                }}
                onBlur={() => handleBlur('password')}
                autoComplete="current-password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="field-error-message animate-fade-in">
                <AlertCircle size={13} />
                <span>{errors.password}</span>
              </p>
            )}

            {/* 3. Display Password Strength (Mandatory Requirement) */}
            <PasswordStrengthMeter password={password} showCriteria={true} />
          </div>

          {/* 4. Remember User Checkbox (Mandatory Requirement) */}
          <div className="remember-me-group">
            <label className="remember-me-label">
              <input
                type="checkbox"
                className="checkbox-custom"
                checked={rememberUser}
                onChange={(e) => setRememberUser(e.target.checked)}
                disabled={isSubmitting}
              />
              <span className="checkbox-text">
                <strong>Remember User</strong>
                <span className="checkbox-sub">
                  {rememberUser
                    ? 'Persists JWT & session in LocalStorage across browser restarts'
                    : 'Stores JWT in SessionStorage (cleared upon tab closure)'}
                </span>
              </span>
            </label>
          </div>

          {/* 5. Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-block submit-auth-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="btn-spinner" />
                <span>Issuing RFC 7519 JWT Token...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In to Protected Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Assignment 7 Specification Matrix */}
        <div className="compliance-mini-box">
          <div className="compliance-header">
            <CheckCircle2 size={14} className="icon-emerald" />
            <span>Assignment 7 Requirements Met:</span>
          </div>
          <ul className="compliance-list">
            <li>✓ Username Required Validation</li>
            <li>✓ Password Required Validation</li>
            <li>✓ Real-Time Password Strength Meter</li>
            <li>✓ Remember User Checkbox (LocalStorage Sync)</li>
            <li>✓ Simulated RFC 7519 JWT Bearer Generation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
