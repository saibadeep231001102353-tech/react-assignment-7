import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatRemainingTime } from '../utils/jwtUtils';
import { 
  X, 
  KeyRound, 
  Copy, 
  Check, 
  Clock, 
  Database, 
  Shield, 
  RefreshCw, 
  Lock 
} from 'lucide-react';
import './JwtInspectorModal.css';

const JwtInspectorModal = ({ isOpen, onClose }) => {
  const { token, decodedToken, storageType, rememberMe, refreshToken } = useAuth();
  const [copied, setCopied] = useState(false);
  const [refreshedToast, setRefreshedToast] = useState(false);

  if (!isOpen || !decodedToken) return null;

  const handleCopy = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    refreshToken();
    setRefreshedToast(true);
    setTimeout(() => setRefreshedToast(false), 2000);
  };

  const { parts, header, payload, isExpired } = decodedToken;
  const remainingTimeStr = formatRemainingTime(payload.exp);

  return (
    <div className="jwt-modal-overlay" onClick={onClose}>
      <div className="jwt-modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="jwt-modal-header">
          <div className="jwt-header-title">
            <div className="jwt-icon-wrapper">
              <KeyRound size={20} className="icon-emerald" />
            </div>
            <div>
              <h3>Simulated JWT Bearer Inspector</h3>
              <p className="jwt-header-sub">RFC 7519 JSON Web Token Simulation & Claims Decoder</p>
            </div>
          </div>
          <button className="jwt-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Status Strip */}
        <div className="jwt-status-strip">
          <div className="status-badge-item">
            <Clock size={14} />
            <span>Time Remaining:</span>
            <strong className={isExpired ? 'expired' : 'active'}>{remainingTimeStr}</strong>
          </div>
          <div className="status-badge-item">
            <Database size={14} />
            <span>Storage:</span>
            <strong className="mono">{storageType}</strong>
            <span className="storage-hint">
              ({rememberMe ? 'Persistent across browser restarts' : 'Session-only tab scope'})
            </span>
          </div>
          <div className="status-badge-item">
            <Shield size={14} />
            <span>Algorithm:</span>
            <strong className="mono">HMAC SHA-256 (HS256)</strong>
          </div>
        </div>

        {/* Raw Encoded Token (Color-coded 3 parts) */}
        <div className="jwt-section">
          <div className="jwt-section-title">
            <span>Raw Encoded Token</span>
            <div className="jwt-actions">
              <button 
                className={`btn btn-xs ${refreshedToast ? 'btn-success' : 'btn-outline'}`}
                onClick={handleRefresh}
                title="Extend token expiry by 1 hour"
              >
                <RefreshCw size={12} className={refreshedToast ? 'animate-spin' : ''} />
                {refreshedToast ? 'Renewed' : 'Extend (1h)'}
              </button>
              <button 
                className={`btn btn-xs ${copied ? 'btn-success' : 'btn-primary'}`}
                onClick={handleCopy}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy Token'}
              </button>
            </div>
          </div>
          <div className="raw-token-box">
            <span className="token-part-header" title="Header (Algorithm & Token Type)">
              {parts.headerPart}
            </span>
            <span className="token-dot">.</span>
            <span className="token-part-payload" title="Payload (User Claims & Roles)">
              {parts.payloadPart}
            </span>
            <span className="token-dot">.</span>
            <span className="token-part-signature" title="Signature (Verification Hash)">
              {parts.signaturePart}
            </span>
          </div>
          <div className="token-legend">
            <span className="legend-item legend-header">Header</span>
            <span className="legend-item legend-payload">Payload Claims</span>
            <span className="legend-item legend-signature">Simulated Signature</span>
          </div>
        </div>

        {/* Decoded Blocks Grid */}
        <div className="jwt-decoded-grid">
          {/* Decoded Header */}
          <div className="decoded-block">
            <div className="decoded-block-title header-color">
              <Lock size={14} />
              <span>Decoded Header</span>
            </div>
            <pre className="decoded-pre">
              {JSON.stringify(header, null, 2)}
            </pre>
          </div>

          {/* Decoded Payload */}
          <div className="decoded-block">
            <div className="decoded-block-title payload-color">
              <Shield size={14} />
              <span>Decoded Payload Claims</span>
            </div>
            <pre className="decoded-pre">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        </div>

        {/* Claims Explanation Table */}
        <div className="jwt-section">
          <div className="jwt-section-title">Standard Claims Registry</div>
          <div className="claims-table-wrapper">
            <table className="claims-table">
              <thead>
                <tr>
                  <th>Claim</th>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>sub</code></td>
                  <td><code>{payload.sub}</code></td>
                  <td>Subject identifier for the authenticated user</td>
                </tr>
                <tr>
                  <td><code>username</code></td>
                  <td><code>{payload.username}</code></td>
                  <td>Sanitized system login credential</td>
                </tr>
                <tr>
                  <td><code>role</code></td>
                  <td><span className="badge badge-emerald">{payload.role}</span></td>
                  <td>Assigned cybersecurity access privilege</td>
                </tr>
                <tr>
                  <td><code>iss</code></td>
                  <td><code>{payload.iss}</code></td>
                  <td>Issuer authority for simulated token</td>
                </tr>
                <tr>
                  <td><code>iat</code></td>
                  <td><code>{payload.iat}</code> ({decodedToken.issuedAt ? decodedToken.issuedAt.toLocaleTimeString() : ''})</td>
                  <td>Issued-at epoch timestamp</td>
                </tr>
                <tr>
                  <td><code>exp</code></td>
                  <td><code>{payload.exp}</code> ({decodedToken.expiresAt ? decodedToken.expiresAt.toLocaleTimeString() : ''})</td>
                  <td>Expiration epoch timestamp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="jwt-modal-footer">
          <span className="jwt-footer-note">
            AuthGuard Security Token Engine • Assignment 7 Specification
          </span>
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

export default JwtInspectorModal;
