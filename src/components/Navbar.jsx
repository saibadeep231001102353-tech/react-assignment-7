import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  KeyRound, 
  LogOut, 
  LogIn, 
  Sun, 
  Moon, 
  CheckSquare, 
  PlusCircle, 
  LayoutDashboard,
  Shield,
  UserCheck
} from 'lucide-react';
import JwtInspectorModal from './JwtInspectorModal';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('authguard_theme') || 'dark');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('authguard_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="navbar-root">
        <div className="navbar-container">
          {/* Brand Logo */}
          <NavLink to="/" className="navbar-brand">
            <div className="brand-icon-box">
              <ShieldCheck size={22} className="brand-icon" />
            </div>
            <div className="brand-text-group">
              <span className="brand-title">
                Auth<span className="text-emerald">Guard</span>
              </span>
              <span className="brand-badge">Assignment 7</span>
            </div>
          </NavLink>

          {/* Navigation Links (Protected) */}
          {isAuthenticated && (
            <nav className="navbar-nav">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                <CheckSquare size={16} />
                <span>Assignment 6 Tasks</span>
              </NavLink>

              <NavLink
                to="/add-task"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                <PlusCircle size={16} />
                <span>Add Task</span>
              </NavLink>
            </nav>
          )}

          {/* Right Action Tools */}
          <div className="navbar-actions">
            {/* JWT Inspector Trigger Button */}
            {isAuthenticated && token && (
              <button
                type="button"
                className="btn btn-outline btn-sm jwt-trigger-btn"
                onClick={() => setIsInspectorOpen(true)}
                title="Inspect Base64 JWT Token claims & verification status"
              >
                <KeyRound size={14} className="icon-emerald" />
                <span className="jwt-btn-text">JWT Inspector</span>
                <span className="jwt-live-dot" />
              </button>
            )}

            {/* Theme Toggle */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="theme-icon sun" />
              ) : (
                <Moon size={18} className="theme-icon moon" />
              )}
            </button>

            {/* User Session & Logout / Login */}
            {isAuthenticated && user ? (
              <div className="user-session-group">
                <div className="user-pill" title={`Logged in as ${user.username} (${user.role})`}>
                  <div className="user-avatar-icon">
                    <UserCheck size={16} />
                  </div>
                  <div className="user-details">
                    <span className="user-name">{user.username}</span>
                    <span className="user-role">{user.role}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-danger-outline btn-sm logout-btn"
                  onClick={handleLogout}
                  title="Sign out and destroy session tokens"
                >
                  <LogOut size={15} />
                  <span className="logout-text">Logout</span>
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="btn btn-primary btn-sm login-nav-btn">
                <LogIn size={15} />
                <span>Sign In</span>
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* JWT Inspector Modal */}
      <JwtInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />
    </>
  );
};

export default Navbar;
