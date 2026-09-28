import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, token } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          color: 'var(--text-secondary)'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              border: '3px solid rgba(16, 185, 129, 0.2)',
              borderTopColor: 'var(--emerald-500)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
          <Lock size={24} style={{ color: 'var(--emerald-400)' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Verifying Cryptographic Session
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Auditing Base64 JWT bearer claims & Route Guard...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    // Redirect to login page and preserve the attempted URL so user can be returned after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
